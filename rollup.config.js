import eslint from 'rollup-plugin-eslint';
import babel from 'rollup-plugin-babel';

export default {
  input: 'src/Togglerone.js',
  output: [
    {
      name: 'Togglerone',
      file: 'dist/togglerone.js',
      format: 'umd'
    },
    {
      name: 'Togglerone',
      file: 'dist/togglerone.esm.js',
      format: 'es'
    }
  ],
  plugins: [
    eslint(),
    babel({
      include: 'src/**'
    })
  ],
  watch: {
    chokidar: true
  }
};
