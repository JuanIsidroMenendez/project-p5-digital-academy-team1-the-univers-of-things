import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import AppPagination from '../AppPagination.vue'

// 🔵 REFACTOR: función auxiliar para evitar repetir la búsqueda de botones
// en cada test. Centraliza el montaje del componente con sus props.
function mountPagination(props) {
  return mount(AppPagination, { props })
}

// 🔵 REFACTOR: función auxiliar para obtener el botón "anterior" o "siguiente"
// por su aria-label, reutilizada en varios tests
function getNavButton(wrapper, label) {
  return wrapper.find(`button[aria-label="${label}"]`)
}

describe('AppPagination', () => {
  it('el botón anterior está deshabilitado en la página 1', () => {
    const wrapper = mountPagination({ currentPage: 1, totalPages: 5 })
    const prevButton = getNavButton(wrapper, 'Pagina anterior')
    expect(prevButton.attributes('disabled')).toBeDefined()
  })

  it('el botón anterior NO está deshabilitado si no estamos en la página 1', () => {
    const wrapper = mountPagination({ currentPage: 3, totalPages: 5 })
    const prevButton = getNavButton(wrapper, 'Pagina anterior')
    expect(prevButton.attributes('disabled')).toBeUndefined()
  })

  it('el botón siguiente está deshabilitado en la última página', () => {
    const wrapper = mountPagination({ currentPage: 5, totalPages: 5 })
    const nextButton = getNavButton(wrapper, 'Pagina siguiente')
    expect(nextButton.attributes('disabled')).toBeDefined()
  })

  it('emite page-change con la página correcta al hacer clic en un número', async () => {
    const wrapper = mountPagination({ currentPage: 1, totalPages: 5 })
    const pageButtons = wrapper.findAll('button.pagination__btn')
    const pageTwoButton = pageButtons.find((btn) => btn.text() === '2')

    await pageTwoButton.trigger('click')

    expect(wrapper.emitted('page-change')).toBeTruthy()
    expect(wrapper.emitted('page-change')[0]).toEqual([2])
  })

  it('emite page-change con currentPage + 1 al hacer clic en siguiente', async () => {
    const wrapper = mountPagination({ currentPage: 2, totalPages: 5 })
    const nextButton = getNavButton(wrapper, 'Pagina siguiente')

    await nextButton.trigger('click')

    expect(wrapper.emitted('page-change')[0]).toEqual([3])
  })

  it('emite page-change con currentPage - 1 al hacer clic en anterior', async () => {
    const wrapper = mountPagination({ currentPage: 3, totalPages: 5 })
    const prevButton = getNavButton(wrapper, 'Pagina anterior')

    await prevButton.trigger('click')

    expect(wrapper.emitted('page-change')[0]).toEqual([2])
  })

  it('marca la página activa con aria-current="page"', () => {
    const wrapper = mountPagination({ currentPage: 3, totalPages: 5 })
    const activeButton = wrapper.find('button[aria-current="page"]')
    expect(activeButton.text()).toBe('3')
  })
})