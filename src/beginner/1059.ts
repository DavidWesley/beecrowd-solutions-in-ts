import { EOL } from "node:os"

function main(): void {
  const output = []
  for (let i = 2; i <= 100; i += 2)
    output.push(i)

  console.log(output.join(EOL))
}

main()