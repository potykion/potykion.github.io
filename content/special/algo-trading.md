## [Basics algorithmic trading concepts and examples](https://www.investopedia.com/articles/active-trading/101014/basics-algorithmic-trading-concepts-and-examples.asp)

- Простейшая стретегия
    - Покупаем когда ma 50 > ma 200
    - Продаем когда ma 50 < ma 200
    - Только хз в чем тут профит 🤔🤔🤔
- Виды стратегий
    - Trend-Following Strategies - на
      основе [Technical Indicator](https://www.investopedia.com/terms/t/technicalindicator.asp)
    - [Arbitrage](https://www.investopedia.com/terms/a/arbitrage.asp) Opportunities - о, это как я в стиме торговал:
      покупаем игру в русском стиме, продаем иностранцам
    - Index Fund Rebalancing - фонды часто ребалансируются - это отличная возможность трейдануть
    - Mathematical Model-Based Strategies - мат модели юзаем
    - Непонятные слова
        - Trading Range ([Mean Reversion](https://www.investopedia.com/terms/m/meanreversion.asp))
        - Volume-Weighted Average Price ([VWAP](https://www.investopedia.com/terms/v/vwap.asp))
        - Time Weighted Average Price (TWAP)
        - Percentage of Volume (POV)
        - [Implementation Shortfall](https://www.investopedia.com/terms/i/implementation-shortfall.asp)

### [Moving average](https://www.investopedia.com/terms/m/movingaverage.asp)

- Moving average (MA) - avg in time range
    - 5 дней, цены акции: 10, 12, 12, 14, 10 => ma = 11.6
    - в след день цена = 12 => ma = 12
- Sma = ma
- Ema - чем ближе день к настоящему, тем больше у него вес
- Показывает тренд

## [Типы заявок](https://www.tinkoff.ru/invest/help/brokerage/account/trade-on-bs/bids/)

- Биржевые
    - В течение дня
    - Лимитная - порог и выше
        - Например, текущая цена акции Х — 100 ₽.
        - Лимитная заявка на покупку по 90 ₽ = сделка будет совершена, когда цена акции опустится до 90 ₽ или ниже.
        - Лимитная заявка на продажу по 110 ₽ = сделка будет совершена, когда цена акции на бирже будет 110 ₽ или выше.
    - Рыночная - просто по цене рынка
    - Лучшая цена = рыночная + защита
- Отложенные заявки (их еще называют стоп‑приказами)
    - Сколько угодно времени
    - стоп‑маркет = рыночная + неограниченный срок
    - стоп‑лимит = лимитка + неограниченный срок
        - покупаем за 200, и делаем стоп-лимит за 190, и если будет 190 то лимитка, а если 189, то 189
    - тейк‑профит = фиксируем прибыль
        - покупаем за 200, и делаем тейк-профит за 210, и если будет 210, то лимитка

## Прочее

- https://www.phind.com/search?cache=nulubl53ft0pfobkqjt9mfox
- https://github.com/RussianInvestments/invest-python?tab=readme-ov-file
