<style>

select {
    width: 100%;
    padding: 10px;
    border-radius: 10px;
    font-size: 20px;
    margin-bottom: 16px;
}

input {
    border: 1px solid lightgray;
    margin-bottom: 16px;

}

</style>

<script type="module">
  import { createApp } from '../../../a/decisions/petite-vue.js';
  import {store} from "../../../a/decisions/decisions.js";
  
  createApp({store}).mount();
</script>


# Принятия решений

<div>
<select v-model="store.howCanIHelp">
<option value="init" disabled>Чем помочь?</option>
<option value="theatre">Театр</option>
<option value="movie">Кино</option>
</select>
</div>

<div v-if="store.howCanIHelp === 'theatre' || store.howCanIHelp === 'movie'" >
<label>
Сколько будет идти спектакль/фильм?
<input min="0" type="number" v-model.number="store.hours"> часов
</label>
</div>


<div v-if="store.decision() == 'yes'" style="color: forestgreen; font-weight: bold">Можно 👍</div>
<div v-if="store.decision() == 'no'" style="color: red; font-weight: bold">НЕ НАДО 🙅‍♂️🙅‍♂️🙅‍♂️</div>



## Развлечения

- Для начала хорошо бы изучить что предлагается: интересно ли это тебе хоть сколечко?

### Что учитывать при выборе аутдора (поход, ферма зверушек)?

- Сколько добираться: по времени и по деньгам
    - Напр. ездили на ферму, но не учли что добираться час на тачке или 2+ на транспорте - в результате 4к на таксо
      потратили




