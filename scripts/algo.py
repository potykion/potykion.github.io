import dataclasses
import decimal
import os
import time
from decimal import Decimal
from typing import Literal, Callable

from dotenv import load_dotenv
from tinkoff.invest import (
    Client,
    OrderDirection,
    OrderType,
    Account,
    PortfolioPosition,
)
from tinkoff.invest.services import Services
from tinkoff.invest.utils import quotation_to_decimal, decimal_to_quotation

from potyk_io_back.core import BASE_DIR

TMOS_FIGI = "BBG333333333"
RUB_FIGI = "RUB000UTSTOM"


@dataclasses.dataclass(kw_only=True)
class Bot:
    account_id: str
    client: Services
    portfolio_positions: list[PortfolioPosition] = dataclasses.field(
        default_factory=list
    )
    default_quantity: int | None = None
    default_figi: int | None = None
    default_wait: int | None = 5

    # region init
    @classmethod
    def init(cls, client, update_portfolio=True):
        response = client.users.get_accounts()
        account: Account
        account, *_ = response.accounts
        account_id = account.id

        bot = cls(account_id=account_id, client=client)
        if update_portfolio:
            bot.update_portfolio()

        return bot

    def set_quantity(self, quanity):
        self.default_quantity = quanity
        return self

    def set_figi(self, figi):
        self.default_figi = figi
        return self

    def set_wait(self, wait):
        self.default_wait = wait
        return self

    # endregion init

    def get_portfolio_position(self, figi) -> PortfolioPosition | None:
        return next((pos for pos in self.portfolio_positions if pos.figi == figi), None)

    def get_portfolio_cash(self) -> Decimal:
        rub = self.get_portfolio_position(RUB_FIGI)
        return quotation_to_decimal(rub.quantity) if rub else Decimal(0)

    def update_portfolio(self):
        portfolio = client.operations.get_portfolio(account_id=self.account_id)
        portfolio_positions = portfolio.positions
        self.portfolio_positions = portfolio_positions

    def sell_limit(
        self, *, price: decimal.Decimal, quantity: int = None, figi: str = None
    ):
        quantity = quantity or self.default_quantity
        figi = figi or self.default_figi

        return client.orders.post_order(
            account_id=self.account_id,
            figi=figi,
            quantity=quantity,
            price=decimal_to_quotation(price),
            direction=OrderDirection.ORDER_DIRECTION_SELL,
            order_type=OrderType.ORDER_TYPE_LIMIT,
        )

    def buy_limit(
        self, *, price: decimal.Decimal, quantity: int = None, figi: str = None
    ):
        quantity = quantity or self.default_quantity
        figi = figi or self.default_figi

        return client.orders.post_order(
            account_id=self.account_id,
            figi=figi,
            quantity=quantity,
            price=decimal_to_quotation(price),
            direction=OrderDirection.ORDER_DIRECTION_BUY,
            order_type=OrderType.ORDER_TYPE_LIMIT,
        )

    def get_price(self, *, figi=None, round=Decimal("0.01")) -> decimal.Decimal:
        figi = figi or self.default_figi

        current_price = (
            client.market_data.get_last_prices(figi=[figi]).last_prices[0].price
        )

        current_price = quotation_to_decimal(current_price)
        if round:
            current_price = current_price.quantize(Decimal("0.01"))

        return current_price

    def update_portfolio_until_position(self, *, exists: bool):
        while True:
            pos = bot.get_portfolio_position(self.default_figi)

            if exists and pos or (not exists and not pos):
                return pos

            time.sleep(self.default_wait)

    def get_price_until(self, cond: Callable[[decimal.Decimal], bool]):
        while True:
            price = self.get_price()

            if cond(price):
                return price

            time.sleep(self.default_wait)


load_dotenv(BASE_DIR / ".env")
TOKEN = os.getenv("TINK_TOKEN")

with Client(TOKEN) as client:
    bot = (
        Bot.init(client, update_portfolio=False)
        .set_figi(TMOS_FIGI)
        .set_quantity(100)
        .set_wait(5)
    )

    bought_price = None
    status: Literal["sell_wip", "buy_wip"] | None = None

    while True:
        bot.update_portfolio()
        tmos = bot.get_portfolio_position(TMOS_FIGI)

        if not tmos:
            print(f"No {bot.default_figi}, will buy {bot.default_quantity} lots")

            current_price = bot.get_price()
            print(f"Current price: {current_price} - lets buy some...")

            resp = bot.buy_limit(price=current_price)
            print(f"Buy limit order: {resp}")

            print("Waiting for order...")
            tmos = bot.update_portfolio_until_position(exists=True)
            print(f"{bot.default_figi} bought: {tmos}")

            # todo get actual bought price from ops
            #   ops = client.operations.get_operations(account_id=account_id, figi=figi)
            bought_price = current_price
            print("Bought price:", bought_price)

        if bought_price:
            print(f"{bot.default_figi} bought, will sell it")

            current_price = bot.get_price_until(
                lambda current_price: current_price - bought_price >= Decimal("0.01")
            )
            print(f"Current price > bought price: {current_price} - lets sell it...")

            resp = bot.sell_limit(price=current_price)
            print(f"Sell limit order: {resp}")

            bot.update_portfolio_until_position(exists=False)
            portfolio_cash = bot.get_portfolio_cash()
            print(f"{bot.default_figi} sold, portfolio cash: {portfolio_cash}")

    # # Напр. купили за 100
    # ops = client.operations.get_operations(account_id=account_id, figi=figi)
    # # todo filter buy ops
    # buy_price = ops[0]

    # # Текущая цена = 100.01
    # current_price = bot.get_price()
    #
    # # 100.01 - 100 >= 0.01 => продаем
    # if current_price - buy_price >= Decimal("0.01"):
    #     resp = bot.sell_limit(price=current_price)
