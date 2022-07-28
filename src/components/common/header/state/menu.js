import { computed, ref } from "vue"

const isExpand = ref(false)
const menuType = computed(() => (isExpand.value ? "vertical" : "horizontal")) // horizontal
const className = computed(() => {
	if (!isExpand.value) {
		return "menu-select-list"
	}

	return "menu-select-list show"
})

const useMenuState = () => {
	const changeExpand = () => { isExpand.value = !isExpand.value }

	return {
		isExpand,
		changeExpand,
		className,
		menuType
	}
}

export {
	useMenuState
}
