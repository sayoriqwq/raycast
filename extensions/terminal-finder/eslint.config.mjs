import antfu from '@antfu/eslint-config'

// Antfu's stylistic rules are the sole formatter; Prettier is intentionally omitted.
export default antfu({
  typescript: true,
  ignores: [
    '*.js',
    'raycast-env.d.ts',
  ],
})
