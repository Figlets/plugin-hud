
const icons = require('./dist/icons.js')
const fs = require('fs')

let data = []

Object.keys(icons['icons'])

let keys = Object.keys(icons['icons'])

const camelize = s => s.replace(/-./g, x=>x[1].toUpperCase())


keys.forEach(key => {
  Object.entries(icons['icons'][key]).forEach(entry => {
    let name = `${key}-${entry[0]}`
    let buff = Buffer.from(entry[1].split(',')[1],'base64')
    let str = buff.toString('ascii')
    data.push(`export const ${camelize(name)}: string = \`${str.replace(/\n|\r/g, "")}\``)
  })
})

// const data = Object.keys(icons)[icons].map(n => n.toString())

// function Uint8ToString(u8a) {
//     const CHUNK_SZ = 0x8000;
//     const c = [];
//     for (let i = 0; i < u8a.length; i += CHUNK_SZ) {
//       c.push(
//         String.fromCharCode.apply(
//           null,

//           u8a.subarray(i, i + CHUNK_SZ),
//         ),
//       );
//     }
//     return c.join('');
//   }




fs.writeFileSync('./src/iconsvg.ts',data.join(';\r\n'),{'encoding': 'utf-8'})