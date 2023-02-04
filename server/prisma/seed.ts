// Arquivo Seed funciona para gerar 

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    const user = await prisma.user.create({
        data: {
            name: 'John Doe',
            email: 'john.doe@gmail.com',
            avatarUrl: 'https://github.com/diego3g.png',
        }
    })

    const bet = await prisma.bet.create({
        data: {
            title: 'Example Pool',
            code: 'BET123',
            ownerId: user.id,

            participants: {
                create: {
                    userId: user.id
                }
            }
        }
    })

    await prisma.game.create({
        data: {
            date: '2022-11-13T12:00:00.201Z',
            firstTeamCountryCode: 'BR',
            secondTeamCountryCode: 'DE',
        }
    })

    await prisma.game.create({
        data: {
            date: '2022-11-14T13:30:00.201Z',
            firstTeamCountryCode: 'AR',
            secondTeamCountryCode: 'IT',

            guesses: {
                create: {
                    firstTeamPoints: 2,
                    secondTeamPoints: 3,

                    participant: {
                        connect: {
                            userId_betId: {
                                userId: user.id,
                                betId: bet.id,
                            }
                        }
                    }
                }
            }
        }
    })
}

main()