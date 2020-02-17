import directive from '../src/directive.js'

function createDirectiveArgument(el = document.createElement('button'), value = {}, modifiers = {}) {
  return {
    el,
    binding: {
      name: 'hover',
      rawName: 'v-hover',
      value,
      modifiers
    },
  }
}

describe('directive.js', () => {

  it('has bind, inserted and unbind methods available', () => {
    expect(typeof directive.bind).toBe('function')
    expect(typeof directive.inserted).toBe('function')
    expect(typeof directive.unbind).toBe('function')
  })

  describe('bind', () => {
    it('adds the new styles to the element', () => {
      const {el, binding} = createDirectiveArgument(
        document.createElement('button'),
        { backgroundColor: 'blue', color: 'white' }
      )

      directive.bind(el, binding)

      expect(el.options.oldStyles).toBe('')
      expect(el.options.newStyles).toBe('background-color: blue; color: white;')
    })

    it('adds !important to the new styles if the important modifier is provided', () => {
      const {el, binding} = createDirectiveArgument(
        document.createElement('button'),
        { backgroundColor: 'blue', color: 'white' },
        { important: true }
      )

      directive.bind(el, binding)

      expect(el.options.oldStyles).toBe('')
      expect(el.options.newStyles).toBe('background-color: blue !important; color: white !important;')
    })

    it('merges the old styles with the new styles to the element', () => {
      const {el, binding} = createDirectiveArgument(
        document.createElement('button'),
        { backgroundColor: 'blue', color: 'white' }
      )
      el.style.fontSize = '20px'

      directive.bind(el, binding)

      expect(el.options.oldStyles).toBe('font-size: 20px;')
      expect(el.options.newStyles).toBe('background-color: blue; color: white; font-size: 20px;')
    })

    it('overrides the new styles over the old styles', () => {
      const {el, binding} = createDirectiveArgument(
        document.createElement('button'),
        { backgroundColor: 'blue', color: 'white' }
      )
      el.style.backgroundColor = 'black'

      directive.bind(el, binding)

      expect(el.options.oldStyles).toBe('background-color: black;')
      expect(el.options.newStyles).toBe('background-color: blue; color: white;')
    })

    it('does not add options to the element if there is not value provided', () => {
      const {el, binding} = createDirectiveArgument()

      directive.bind(el, binding)

      expect(el.options).toBeUndefined()
    })
  })

  describe('inserted', () => {
    it('adds mouseover and mouseleave as listeners to the element', () => {
      const {el, binding} = createDirectiveArgument(
        document.createElement('button'),
        { backgroundColor: 'blue', color: 'white' }
      )
      el.addEventListener = jest.fn()

      directive.bind(el, binding)
      directive.inserted(el, binding)

      expect(el.addEventListener).toHaveBeenCalledTimes(2)
      expect(el.addEventListener.mock.calls[0][0]).toBe('mouseover')
      expect(el.addEventListener.mock.calls[1][0]).toBe('mouseleave')
    })
  })

  describe('unbind', () => {
    it('adds mouseover and mouseleave as listeners to the element', () => {
      const {el, binding} = createDirectiveArgument(
        document.createElement('button'),
        { backgroundColor: 'blue', color: 'white' }
      )
      el.removeEventListener = jest.fn()

      directive.bind(el, binding)
      directive.inserted(el, binding)
      directive.unbind(el, binding)

      expect(el.removeEventListener).toHaveBeenCalledTimes(2)
      expect(el.removeEventListener.mock.calls[0][0]).toBe('mouseover')
      expect(el.removeEventListener.mock.calls[1][0]).toBe('mouseleave')
    })
  })
})
