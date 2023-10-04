import { createHash } from "node:crypto"
import { readFileSync } from "node:fs"
import { EOL } from "node:os"
import { stdin } from "node:process"

const input: Array<string> = readFileSync(stdin.fd, { encoding: "ascii" }).split(EOL)

const validatePassword = (() => {
  const ALGORITHM = "sha256"
  const INPUT_ENCODING = "ascii"
  const OUTPUT_ENCODING = "base64"
  const VALID_HASH = "bJTjXMw1LU6e8LmVYs/5laV0HOjeitEbVoiSk02u42Y=" // Hard Coded correct password in base64 format

  const hash = createHash(ALGORITHM).setEncoding(INPUT_ENCODING)

  return (password: string) => VALID_HASH === hash
    .copy()
    .update(password)
    .digest(OUTPUT_ENCODING)
})()

function main(): void {
  const output = []

  loop:
  for (const password of input) {
    switch (validatePassword(password)) {
      case true: output.push("Acesso Permitido"); break loop
      case false: output.push("Senha Invalida"); break
    }
  }

  console.log(output.join(EOL))
}

main()