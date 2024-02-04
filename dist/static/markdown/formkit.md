## Как делать кастомные компоненты в FormKit

### Задача

- Есть существующий проект, в нем уже есть какие-то стилизованные инпуты
- Надо сделать так чтобы FormKit с ними работал
### Определение кастомного инпута

- Для удобства создаем FormKit-компонент обертку
- Тут вся суть в объекте `context` - туда приходит вся инфа об инпуте, включая значение, тексты, стили, аттрибуты
- Для биндинга значения нужно заюзать 2 штучки: `context._value` и `context.node.input($event)`
	- Для обычных инпутов:
		```
		@input="e => context.node.input(e.target.value)"  
		:value="context._value"
		```
	- Для кастомных элементов, где используется `v-model` привязываем так:
		```vue
		:model-value="context._value"  
	    @update:model-value="context.node.input($event)"  
	    ```
- Итого компонент-обертка будет выглядеть так:
	```html
	<template>  
	  <!-- Атрибуты можно передавать любые - все приходят в attrs -->
	  <field-label :required="context.attrs.required">  
		{{ context.label }}  
	  </field-label>  
	  <!-- Собсно биндинг -->
	  <text-input  
		:model-value="context._value"  
		@update:model-value="context.node.input($event)"  
	  />  
	</template>  
	<script setup lang="ts">  
	import { PropType } from 'vue';  
	// Существующие компоненты 
	import TextInput from '@components/form/text-input.component.vue';  
	import FieldLabel from '@components/crud/field-label.component.vue';  
	// Тип для context
	import { FormKitFrameworkContext } from '@formkit/core';  
	  
	const props = defineProps({  
	  context: Object as PropType<FormKitFrameworkContext>,  
	});  
	</script>  
	<style scoped lang="scss"></style>
	```

### Глобальная регистрация кастомных инпутов

- FormKit предоставляет набор готовых инпутов
- Но мы хотим свои, а для этого надо их зарегать
- Есть 2 способа регистрации кастома
	- Используя `createInput` обертку: это когда хотим только кастом инпут, а лейблы, ошибки валиции и тд отдаем на плечи FormKit-у
	- Используя объект: `{type: 'input', component}`: это когда все сами хотим контролировать
- А еще можно просто подправить стили - используя `config.classes`
	```ts
	import { plugin, defaultConfig, createInput } from '@formkit/vue';
	
	// Кастомный компонент
	import FormKitTextInput from '@spa/crud-components/FormKitTextInput.vue';
	
	createApp(App)    
	  .use(  
		plugin,  
		defaultConfig({  
		  inputs: {  
			// Создает инпут без пресетов
			text: {  
			  type: 'input',  
			  component: FormKitTextInput,  
			},  
			// Создает инпут с пресетами (лейбл, хелп, ошибки)
			// Т.е. в FormKitTextInput не нужно field-label прописывать
			text2: createInput(FormKitTextInput),  
		  },  
		  // Кастомные классы для дефолтовых инпутов
		  config: {  
			classes: {  
			  label: 'form-kit-label',  
			  input: 'form-kit-input',  
			},  
		  },  
		})  
	  );
	```

### Использование

- Ну и все, компонент определили, зарегали, теперь можем использовать в схеме:
	```html
	<template>  
		<!-- Делаем корневую форму, куда будут все данные складываться, валидироваться и сабмититься -->
		<FormKit type="form" v-model="data">  
		  <!-- И туда суем рендер схемы -->
		  <FormKitSchema :schema="schema" />  
		</FormKit>  
		
		<!-- Что проиходит с формой - можно в pre отобразить -->
		<pre wrap>{{ data }}</pre>  
	</template>  
	  
	<script setup lang="ts">  
	import { ref } from 'vue';  
	  
	const data = ref({});  
	
	const schema = [  
	  {  
		// Элементы схемы минимально должны иметь тип инпута и название поля
		$formkit: 'text',  
		name: 'text',  
		// А это опционалочка: лейблы, хелп-текст, суффикс-иконочки, ...
		label: 'Text',  
		// Кастомные атрибуты как писал - уходят в attrs
		required: true,  
	  },  
	];  
	</script>  
	  
	<style lang="scss"></style>
	```

