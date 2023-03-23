import { viteStaticCopy } from 'vite-plugin-static-copy'

export default {
  plugins: [
    viteStaticCopy({
      targets: [
        {
          src: 'assets/data/owid-energy-switzerland-data.json',
          dest: 'assets/data/'
        }
      ]
    })
  ]
}