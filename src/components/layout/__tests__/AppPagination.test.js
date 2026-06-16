import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import AppPagination from '../AppPagination.vue'

describe('AppPagination', () => {
  // 🔴 RED → 🟢 GREEN: el código ya existe y cumple esto, el test lo confirma
  it('el botón anterior está deshabilitado en la página 1', () => {
    const wrapper = mount(AppPagination, {
      props: { currentPage: 1, totalPages: 5 }
    })
    const prevButton = wrapper.find('button[aria-label="Pagina anterior"]')
    expect(prevButton.attributes('disabled')).toBeDefined()
  })

  it('el botón anterior NO está deshabilitado si no estamos en la página 1', () => {
    const wrapper = mount(AppPagination, {
      props: { currentPage: 3, totalPages: 5 }
    })
    const prevButton = wrapper.find('button[aria-label="Pagina anterior"]')
    expect(prevButton.attributes('disabled')).toBeUndefined()
  })

  it('el botón siguiente está deshabilitado en la última página', () => {
    const wrapper = mount(AppPagination, {
      props: { currentPage: 5, totalPages: 5 }
    })
    const nextButton = wrapper.find('button[aria-label="Pagina siguiente"]')
    expect(nextButton.attributes('disabled')).toBeDefined()
  })

  it('emite page-change con la página correcta al hacer clic en un número', async () => {
    const wrapper = mount(AppPagination, {
      props: { currentPage: 1, totalPages: 5 }
    })
    // Buscamos todos los botones de número de página (excluyendo prev/next)
    const pageButtons = wrapper.findAll('button.pagination__btn')
    // El primer botón de número (después del botón "anterior") es la página 1
    const pageTwoButton = pageButtons.find((btn) => btn.text() === '2')

    await pageTwoButton.trigger('click')

    expect(wrapper.emitted('page-change')).toBeTruthy()
    expect(wrapper.emitted('page-change')[0]).toEqual([2])
  })

  it('emite page-change con currentPage + 1 al hacer clic en siguiente', async () => {
    const wrapper = mount(AppPagination, {
      props: { currentPage: 2, totalPages: 5 }
    })
    const nextButton = wrapper.find('button[aria-label="Pagina siguiente"]')

    await nextButton.trigger('click')

    expect(wrapper.emitted('page-change')[0]).toEqual([3])
  })

  it('emite page-change con currentPage - 1 al hacer clic en anterior', async () => {
    const wrapper = mount(AppPagination, {
      props: { currentPage: 3, totalPages: 5 }
    })
    const prevButton = wrapper.find('button[aria-label="Pagina anterior"]')

    await prevButton.trigger('click')

    expect(wrapper.emitted('page-change')[0]).toEqual([2])
  })

  it('marca la página activa con aria-current="page"', () => {
    const wrapper = mount(AppPagination, {
      props: { currentPage: 3, totalPages: 5 }
    })
    const activeButton = wrapper.find('button[aria-current="page"]')
    expect(activeButton.text()).toBe('3')
  })
})