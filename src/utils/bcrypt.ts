import { compare, hash, hashSync } from 'bcrypt'

class bcrypt {
    private saltRounds: number = 8

    constructor(
        private readonly plainText: string,
        private readonly comparePlainText: string = ''
    ) { }

    async encode() {
        const hashed = await hash(this.plainText, this.saltRounds)

        return hashed
    }

    async decode() {
        const response = await compare(this.comparePlainText, this.plainText)

        return response
    }
}

export default bcrypt