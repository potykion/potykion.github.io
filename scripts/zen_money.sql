-- Итог за год
select
    sum(outcome)
from zen_2024_05_30_dumpof_transactions
where categoryName IS NOT NULL
and date > date('2023-12-31');

-- Траты по категориям (родительские)
select
    -- Еда / Фастфуд/обед/кофе > Еда
    coalesce(iif(substr(categoryName, 0, INSTR(categoryName, '/')) = '', null,
                 substr(categoryName, 0, INSTR(categoryName, '/'))), categoryName) as category,
--     substr(date, 0, 8)                                                             as month,
    sum(outcome)
from zen_2024_05_30_dumpof_transactions
where categoryName IS NOT NULL
and date > date('2023-12-31')
--   and month = '2024-05'
group by category
--        , month
order by sum(outcome) desc;

-- Траты по категориям (дочерние)
select
    -- Еда / Фастфуд/обед/кофе > Еда
categoryName,
--     substr(date, 0, 8)                                                             as month,
    sum(outcome)
from zen_2024_05_30_dumpof_transactions
where categoryName IS NOT NULL
--   and month = '2024-05'
group by categoryName
--        , month
order by sum(outcome) desc;

-- Траты по категориям (Еда)
select
categoryName,
--     substr(date, 0, 8)                                                             as month,
    sum(outcome)
from zen_2024_05_30_dumpof_transactions
where categoryName IS NOT NULL
and categoryName like 'Еда%'
--   and month = '2024-05'
group by categoryName
--        , month
order by sum(outcome) desc;

-- Траты по магазам
select payee, categoryName,
       sum(outcome)
from zen_2024_05_30_dumpof_transactions
where categoryName IS NOT NULL
--   and substr(date, 0, 8) = '2024-02'
  and coalesce(iif(substr(categoryName, 0, INSTR(categoryName, '/')) = '', null,
                   substr(categoryName, 0, INSTR(categoryName, '/') - 1)), categoryName) = 'Еда'
group by payee
order by
--     payee,
    sum(outcome) desc;


-- Траты по магазам (по месяцам + кол-во транзакций + средний чек)
select payee,
       sum(case when substr(date, 0, 8) = '2024-01' then  outcome else 0 end) as '01-sum',
--        sum(case when substr(date, 0, 8) = '2024-01' then  1 else 0 end) as '01-count',
--        avg(case when substr(date, 0, 8) = '2024-01' then  outcome else 0 end) as '01-avg',

       sum(case when substr(date, 0, 8) = '2024-02' then  outcome else 0 end) as '02-sum',
--        sum(case when substr(date, 0, 8) = '2024-02' then  1 else 0 end) as       '02-count',
--        avg(case when substr(date, 0, 8) = '2024-02' then  outcome else 0 end) as '02-avg',

       sum(case when substr(date, 0, 8) = '2024-03' then  outcome else 0 end) as '03-sum',
--        sum(case when substr(date, 0, 8) = '2024-03' then  1 else 0 end) as       '03-count',
--        avg(case when substr(date, 0, 8) = '2024-03' then  outcome else 0 end) as '03-avg',

       sum(case when substr(date, 0, 8) = '2024-04' then  outcome else 0 end) as '04-sum',
--        sum(case when substr(date, 0, 8) = '2024-04' then  1 else 0 end) as       '04-count',
--        avg(case when substr(date, 0, 8) = '2024-04' then  outcome else 0 end) as '04-avg',

       sum(case when substr(date, 0, 8) = '2024-05' then  outcome else 0 end) as '05-sum'
--        sum(case when substr(date, 0, 8) = '2024-05' then  1 else 0 end) as       '05-count',
--        avg(case when substr(date, 0, 8) = '2024-05' then  outcome else 0 end) as '05-avg'
from zen_2024_05_30_dumpof_transactions
where categoryName IS NOT NULL
--   and substr(date, 0, 8) = '2024-02'
  and categoryName like 'Еда%'
and payee = 'PEREKRESTOK'
group by payee
order by
--     payee,
    sum(outcome) desc;

-- Единообразие магазов
update zen_2024_05_30_dumpof_transactions set payee = 'PEREKRESTOK' where payee like 'PEREKRESTOK%';
update zen_2024_05_30_dumpof_transactions set payee = 'SPAR' where payee like 'SPAR%';
update zen_2024_05_30_dumpof_transactions set payee = 'Com 1989' where payee = 'IP Dang K. Ch.';
update zen_2024_05_30_dumpof_transactions set payee = 'Рюмочная Брюзга' where payee = 'Vento';
update zen_2024_05_30_dumpof_transactions set payee = 'MAGNIT' where payee like 'MAGNIT%';
update zen_2024_05_30_dumpof_transactions set payee = 'Имею Право' where payee = 'IP Kuznecov';
update zen_2024_05_30_dumpof_transactions set payee = 'VKUSVILL' where payee like 'VKUSVILL%';
update zen_2024_05_30_dumpof_transactions set payee = 'THE BULL' where payee like 'The bull-aminevka%';
update zen_2024_05_30_dumpof_transactions set payee = 'Фу Сян' where payee like 'SUNRISE MOSCOW';
