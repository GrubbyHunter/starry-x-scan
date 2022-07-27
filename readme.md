# starry-x-scan

[TOC]
> a starry-x blockchain browser，use vue3 + element-plus

## 1、group desc

```javascript
|-- assets // static resource
|-- base // All the underlying abstract classes are here
|    |-- Request.js  // Axios abstract class. All requests should extends it
|    |-- Base.js // base class
|    |-- storages // cache manager
|
|-- common // common data
|-- components // components manager
|-- models // axios request class
|-- storages // storage class
|-- views // page wrapper
|-- main.js // main
|-- router.js 
```

## 2、how to use 
> examples in  ./views/index.vue

1、ajax
```javascript
import fetchList from "@/models/fetch-list"

const getData = async ()=>{
  const result = await fetchList.exec({ include: "is_creator" }, true)

	if (result) {
		console.log(result)
	}
}
```

2、lodash
```javascript
// lodash methods bind in window._
_.isEmpty(xx)
```

3、global api
```javascript
window.global_api.$loading({
  fullscreen: true,
  text: "loading..."
})

window.global_api.$message.success("success")
```

4、mobile css
you can exchange 'px' to 'rem'， 10px => 1rem
```css
/**
 * 10px => 1rem
 */
html {
  font-size: 62.5%;
}

```
