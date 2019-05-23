
'use strict'

const gulp = require('gulp')
const { spawn } = require('child_process')
const { join } = require('path')

gulp.task('lint', done => {
  const cmd = spawn(
    'yarn',
    ['lint'],
    {
      stdio: 'inherit',
      shell: true
    })
  cmd.on('close', () => done())
})

gulp.task('lint:watch', done => {
  gulp.series('lint')()

  const watch = gulp.watch([
    join('**', '*.js'),
    join('!node_modules', '**', '*')
  ],
  {
    cwd: './'
  })

  watch.on('change', gulp.series('lint'))

  done()
})
