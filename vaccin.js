/**
 * Fonction pour lancer les infections et les vaccin.
 * 
 * @param {*} population données contenant les relations.
 * @param {*} infectionMode mode de l'infection VirusA, B, C, 32 et Ultime. A utiliser aussi pour les vaccin.
 * @param {*} parentInfected 
 * @returns 
 */
function zombieSpread(population, infectionMode, parentInfected = false) {
    population.forEach(person => {
        const childInfected = zombieSpread(person.acquaintances, infectionMode, person.infected || parentInfected);
        infectionMode(person, parentInfected, childInfected);
    });
    return population.some(person => person.infected);
}

// Infecte du haut vers le bas
function spreadA(person, parentInfected, childInfected) {
    if (person.infected || parentInfected || childInfected) {
        person.acquaintances.forEach(ac => {
            ac.infected = true;
        });
    }
}

// Infecte du bas vers le haut
function spreadB(person, parentInfected, childInfected) {
    if (person.infected || parentInfected || childInfected) {
        let currentNode = person;
        while (currentNode.parent) {
            currentNode = currentNode.parent;
        }
        currentNode.infected = true;
    }
}

// Infecte partout mais il faut avoir 32 et plus
function spread32(person, parentInfected, childInfected) {
    if (person.infected || parentInfected || childInfected) {
        population.forEach(p => {
            if (p.age >= 32) {
                p.infected = true;
            }
        });
    }
}

// Infecte une personne sur deux
function spreadC(person, parentInfected, childInfected) {
    if (person.infected || parentInfected || childInfected) {
        let currentNode = person;

        // Check s'il y a un infecté.
        const groupInfectedCount = currentNode.acquaintances.filter(p => p.infected).length;

        if (groupInfectedCount >= 1) {
            for (let i = 0; i < currentNode.acquaintances.length; i++) {
                if (i % 2 === 0 && !currentNode.acquaintances[i].infected) {
                    currentNode.acquaintances[i].infected = true;
                }
            }
        }
    }
}

// Infecte uniqument la personne racine
function spreadUlt(person, parentInfected, childInfected) {
    if (person.infected || parentInfected || childInfected) {
        let currentNode = person;
        while (currentNode.parent) {
            currentNode = currentNode.parent;
        }
        currentNode.infected = true;
    }
}

// Vaccine uniquement entre 0 et 30 ans et immune contre les infections.
function vacA1(person, parentInfected, childInfected) {
    if (person.infected || parentInfected || childInfected) {
        population.forEach(p => {
            if (p.age <= 30) {
                p.infected = false;
                p.isVaccinated = true;
            }
        });
    }
}

// Une personne sur deux meurt et le reste est soigné
function vacB1(person, parentInfected, childInfected) {
    
}

// Vaccine et immunise la personne racine
function vacUltime(person, parentInfected, childInfected) {
    if (person.infected || parentInfected || childInfected) {
        let currentNode = person;
        while (currentNode.parent) {
            currentNode = currentNode.parent;
        }
        currentNode.infected = false;
        currentNode.isVaccinated = true;
    }
}

const population = [
    {
        name: 'Victoria',
        age: 28,
        infected: false,
        isVaccinated: false,
        isDead: false,
        acquaintances: [
            {
                name: 'Brandt',
                age: 31,
                infected: false,
                isVaccinated: false,
                isDead: false,
                acquaintances: [
                    {
                        name: 'Winnett',
                        age: 22,
                        infected: true,
                        isVaccinated: false,
                        isDead: false,
                        acquaintances: []
                    },
                    {
                        name: 'Martin',
                        age: 39,
                        infected: false,
                        isVaccinated: false,
                        isDead: false,
                        acquaintances: [
                            {
                                name: 'Hernandez',
                                age: 41,
                                infected: false,
                                isVaccinated: false,
                                isDead: false,
                                acquaintances: []
                            }
                        ]
                    },
                    {
                        name: 'Harding',
                        age: 28,
                        infected: false,
                        isVaccinated: false,
                        isDead: false,
                        acquaintances: []
                    },
                ]
            },
            {
                name: 'Munoz',
                age: 29,
                infected: false,
                isVaccinated: false,
                isDead: false,
                acquaintances: []
            }
        ]
    },
    {
        name: 'Zeigler',
        age: 33,
        infected: false,
        isVaccinated: false,
        isDead: false,
        acquaintances: [
            {
                name: 'Lamantia',
                age: 40,
                infected: false,
                isVaccinated: false,
                isDead: false,
                acquaintances: []
            },
            {
                name: 'Tran',
                age: 35,
                infected: false,
                isVaccinated: false,
                isDead: false,
                acquaintances: []
            }
        ]
    }
];

zombieSpread(population, spreadUlt);
console.log(population);


zombieSpread(population, vacUltime);
console.log(population);