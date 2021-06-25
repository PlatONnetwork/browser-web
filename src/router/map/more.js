const GovernableParameter = () => import('@/views/more/governable-parameter.vue')
const Fund = () => import('@/views/more/fund.vue')

export const governableParameter = {
  path: '/governable-parameter',
  component: GovernableParameter,
  name: 'governableParameter'
}

export const foundationAddress = {
  path: '/foundation-address',
  component: Fund,
  name: 'foundationAddress'
}
