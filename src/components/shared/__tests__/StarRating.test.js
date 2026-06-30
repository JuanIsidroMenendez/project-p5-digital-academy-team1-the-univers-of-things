import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import StarRating from '../StarRating.vue'

describe('StarRating', () => {
  // 🔴 RED → 🟢 GREEN
  it('emite rating-change con el valor correcto al hacer clic en una estrella', async () => {
    const wrapper = mount(StarRating, {
      props: { rating: 0 }
    })

    const stars = wrapper.findAll('.star-rating__star')
    await stars[2].trigger('click') // tercera estrella → valor 3

    expect(wrapper.emitted('rating-change')).toBeTruthy()
    expect(wrapper.emitted('rating-change')[0]).toEqual([3])
  })

  it('renderiza exactamente 5 estrellas', () => {
    const wrapper = mount(StarRating, {
      props: { rating: 2 }
    })

    const stars = wrapper.findAll('.star-rating__star')
    expect(stars).toHaveLength(5)
  })

  it('marca como llenas las estrellas correspondientes a la valoración recibida', () => {
    const wrapper = mount(StarRating, {
      props: { rating: 3 }
    })

    const stars = wrapper.findAll('.star-rating__star')
    expect(stars[0].classes()).toContain('star-rating__star--filled')
    expect(stars[1].classes()).toContain('star-rating__star--filled')
    expect(stars[2].classes()).toContain('star-rating__star--filled')
    expect(stars[3].classes()).not.toContain('star-rating__star--filled')
    expect(stars[4].classes()).not.toContain('star-rating__star--filled')
  })
})