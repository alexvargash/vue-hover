import VueHover from '../src/index.js'
import directive from '../src/directive.js'

describe('index.js', () => {

  it('install the directive into the vue instance', () => {
    const vue = {
      directive: jest.fn(),
    }
    VueHover.install(vue)
    expect(vue.directive).toHaveBeenCalledWith(
      'hover',
      directive,
    )
  })

  it('install the directive only once', () => {
    const vue = {
      directive: jest.fn(),
    }
    VueHover.install(vue)
    expect(vue.directive).toHaveBeenCalledTimes(1)
  })

})
