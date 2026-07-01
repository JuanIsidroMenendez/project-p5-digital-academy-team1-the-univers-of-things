import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import FeaturedHero from '../FeaturedHero.vue'

describe('FeaturedHero', () => {
  it('muestra el titulo principal', () => {
    const wrapper = mount(FeaturedHero)
    expect(wrapper.text()).toContain('Juegos Destacados')
  })

  it('muestra el subtitulo', () => {
    const wrapper = mount(FeaturedHero)
    expect(wrapper.text()).toContain('Los títulos más impresionantes')
  })

  it('muestra el tag del equipo', () => {
    const wrapper = mount(FeaturedHero)
    expect(wrapper.text()).toContain('Selección del equipo')
  })
})