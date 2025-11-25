// Language Toggle Functionality
let currentLanguage = 'bg'; // Default language is Bulgarian

function toggleLanguage() {
    currentLanguage = currentLanguage === 'bg' ? 'en' : 'bg';
    updateLanguage();
}

function updateLanguage() {
    const langBtn = document.getElementById('langToggle');
    const langText = document.getElementById('langText');
    
    // Update button
    if (currentLanguage === 'en') {
        langBtn.querySelector('.flag').textContent = '🇧🇬';
        langText.textContent = 'БГ';
    } else {
        langBtn.querySelector('.flag').textContent = '🇬🇧';
        langText.textContent = 'EN';
    }
    
    // Update all elements with data attributes
    const elements = document.querySelectorAll('[data-bg][data-en]');
    elements.forEach(element => {
        const text = element.getAttribute(`data-${currentLanguage}`);
        if (element.tagName === 'BUTTON' || element.tagName === 'A') {
            // For buttons and links, update only text content without icons
            const iconMatch = element.textContent.match(/[\u{1F300}-\u{1F9FF}]/u);
            element.textContent = text;
            if (iconMatch && !text.includes(iconMatch[0])) {
                element.textContent += ' ' + iconMatch[0];
            }
        } else {
            element.textContent = text;
        }
    });
}

// Smooth Scroll
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    section.scrollIntoView({ behavior: 'smooth' });
}

// Flip Card Animation
function flipCard(card) {
    card.classList.toggle('flipped');
}

// Quiz Data - Organized by Levels
const quizData = {
    bg: {
        level1: [
            {
                question: "Какво представлява въглеродният отпечатък?",
                options: ["Отпечатък от обувки върху въглища", "Количество въглероден диоксид, отделено в резултат на нашите дейности", "Вид горивно за автомобили", "Специален вид растение"],
                correct: 1,
                explanation: "Въглеродният отпечатък е мярка за количеството въглероден диоксид и други парникови газове, отделени в атмосферата в резултат на дейността на човека, организация или общност."
            },
            {
                question: "Кое от следните помага да намалим въглеродния отпечатък?",
                options: ["Оставяне на светлините включени", "Използване на велосипед", "Изхвърляне на боклук навсякъде", "Пилеене на вода"],
                correct: 1,
                explanation: "Използването на велосипед вместо кола намалява емисиите на CO2 и помага за опазване на околната среда. Това е чист и здравословен начин за придвижване."
            },
            {
                question: "Какво правят дърветата за планетата?",
                options: ["Замърсяват въздуха", "Почистват въздуха и поглъщат CO2", "Нищо", "Правят шум"],
                correct: 1,
                explanation: "Дърветата поглъщат въглероден диоксид (CO2) от въздуха и произвеждат кислород чрез фотосинтеза. Те са естествени филтри на въздуха."
            },
            {
                question: "Защо трябва да рециклираме?",
                options: ["За да имаме повече боклук", "За да пазим ресурсите и намалим отпадъците", "Не е важно", "Защото е забавно"],
                correct: 1,
                explanation: "Рециклирането помага да използваме материалите отново, спестява природни ресурси, енергия и намалява количеството отпадъци на сметищата."
            },
            {
                question: "Как можем да пестим енергия у дома?",
                options: ["Изгасване на светлините, когато не ги използваме", "Оставяне на телевизора включен", "Отваряне на прозорците през зимата", "Използване на много електричество"],
                correct: 0,
                explanation: "Изгасването на светлините, когато не ги използваме, е прост и ефективен начин да спестим електроенергия и да намалим въглеродния отпечатък."
            }
        ],
        level2: [
            {
                question: "Пътуване до училище",
                scenario: "Живееш на 2 километра от училището. Как би избрал да пътуваш до там всеки ден?",
                options: [
                    { text: "С кола (родителите те карат)", impact: "high" },
                    { text: "С градски транспорт (автобус)", impact: "medium" },
                    { text: "С велосипед или пеша", impact: "low" }
                ],
                correct: 2,
                explanations: {
                    high: "Използването на кола за къси разстояния създава висок въглероден отпечатък. Автомобилите отделят много CO2, особено при кратки пътувания когато двигателят не е топъл.",
                    medium: "Градският транспорт е по-добър от личния автомобил, тъй като превозва много хора наведнъж, но все пак отделя емисии.",
                    low: "Ходенето пеша или карането на велосипед не отделят въглеродни емисии и е най-екологичният начин за придвижване на кратки разстояния."
                },
                impactLabels: {
                    high: "Въглероден отпечатък: Висок",
                    medium: "Въглероден отпечатък: Среден",
                    low: "Въглероден отпечатък: Нисък"
                }
            },
            {
                question: "Обяд в училище",
                scenario: "Време е за обяд в училище. Какъв избор ще направиш?",
                options: [
                    { text: "Ще си купя опакована храна от магазина", impact: "high" },
                    { text: "Ще си взема храна от вкъщи в пластмасова кутия за еднократна употреба", impact: "medium" },
                    { text: "Ще си взема храна от вкъщи в многократна кутия", impact: "low" }
                ],
                correct: 2,
                explanations: {
                    high: "Опакованата храна от магазина често има множество слоеве опаковки (пластмаса, картон, фолио), които създават много отпадъци и имат висок въглероден отпечатък при производството.",
                    medium: "Еднократните пластмасови кутии се изхвърлят след употреба, което създава отпадъци. По-добре е от опакованата храна, но не е идеалното решение.",
                    low: "Многократните кутии се използват отново и отново, което намалява отпадъците и въглеродния отпечатък значително."
                },
                impactLabels: {
                    high: "Въглероден отпечатък: Висок",
                    medium: "Въглероден отпечатък: Среден",
                    low: "Въглероден отпечатък: Нисък"
                }
            },
            {
                question: "Свободно време",
                scenario: "Имаш свободен следобед. Какво ще избереш да правиш?",
                options: [
                    { text: "Да играя видео игри или да гледам телевизия няколко часа", impact: "medium" },
                    { text: "Да отида с кола до мола за пазаруване", impact: "high" },
                    { text: "Да играя навън с приятели или да чета книга", impact: "low" }
                ],
                correct: 2,
                explanations: {
                    high: "Пътуването с кола до мола създава емисии от транспорта, а моловете консумират много енергия за осветление, климатизация и ескалатори.",
                    medium: "Електронните устройства консумират енергия, което води до въглеродни емисии, особено ако се използват продължително време.",
                    low: "Игрите навън и четенето не изискват електроенергия и са най-екологичните начини за прекарване на свободното време."
                },
                impactLabels: {
                    high: "Въглероден отпечатък: Висок",
                    medium: "Въглероден отпечатък: Среден",
                    low: "Въглероден отпечатък: Нисък"
                }
            },
            {
                question: "Изхвърляне на отпадъци",
                scenario: "Имаш различни видове отпадъци за изхвърляне. Как ще постъпиш?",
                options: [
                    { text: "Ще изхвърля всичко в един контейнер", impact: "high" },
                    { text: "Ще сортирам отпадъците за рециклиране (пластмаса, хартия, стъкло)", impact: "low" },
                    { text: "Ще изхвърля повечето неща, но ще рециклирам само когато е удобно", impact: "medium" }
                ],
                correct: 1,
                explanations: {
                    high: "Изхвърлянето на всичко в един контейнер означава, че нищо не се рециклира. Това води до пълни сметища и необходимост от нови суровини, което има висок въглероден отпечатък.",
                    medium: "Частичното рециклиране е по-добро от никакво, но не е толкова ефективно, колкото пълното сортиране и рециклиране на отпадъците.",
                    low: "Пълното сортиране и рециклиране позволява повторна употреба на материалите, спестява енергия и значително намалява въглеродния отпечатък."
                },
                impactLabels: {
                    high: "Въглероден отпечатък: Висок",
                    medium: "Въглероден отпечатък: Среден",
                    low: "Въглероден отпечатък: Нисък"
                }
            },
            {
                question: "Грижа за околната среда",
                scenario: "Виждаш боклук на игрището в парка. Какво правиш?",
                options: [
                    { text: "Не обръщам внимание - не е моя работа", impact: "high" },
                    { text: "Вдигам го и го изхвърлям в най-близкия кош", impact: "medium" },
                    { text: "Вдигам го и го сортирам в съответния контейнер за рециклиране", impact: "low" }
                ],
                correct: 2,
                explanations: {
                    high: "Оставянето на боклук в природата замърсява околната среда, вреди на животните и растенията, и може да отнеме стотици години за разлагане.",
                    medium: "Изхвърлянето в кош е добро, но без сортиране не се използва пълният потенциал за рециклиране.",
                    low: "Сортирането на отпадъците позволява рециклиране, което намалява нуждата от нови суровини и енергия за производство на нови продукти."
                },
                impactLabels: {
                    high: "Въглероден отпечатък: Висок",
                    medium: "Въглероден отпечатък: Среден",
                    low: "Въглероден отпечатък: Нисък"
                }
            }
        ],
        level3: [
            {
                question: "Планиране на екологично парти",
                scenario: "Организираш парти за рожден ден. Избери най-екологичните опции, за да намалиш въглеродния отпечатък на събитието. Цел: Поддържай въглеродния отпечатък под 3 кг CO₂",
                type: "interactive",
                goal: 3,
                sliders: [
                    { 
                        name: "Използване на чинии и чаши за многократна употреба",
                        impacts: [0],
                        correct: 0
                    },
                    { 
                        name: "Използване на пластмасови чинии и чаши за еднократна употреба",
                        impacts: [5],
                        correct: 0
                    },
                    { 
                        name: "Сервиране на храна от местни производители",
                        impacts: [0],
                        correct: 0
                    },
                    { 
                        name: "Сервиране на екзотични храни, внесени от далечни страни",
                        impacts: [4],
                        correct: 0
                    },
                    { 
                        name: "Изпращане на дигитални покани",
                        impacts: [0],
                        correct: 0
                    },
                    { 
                        name: "Използване на картонени покани",
                        impacts: [2],
                        correct: 0
                    },
                    { 
                        name: "Пускане на балони във въздуха",
                        impacts: [6],
                        correct: 0
                    },
                    { 
                        name: "Използване на биоразградими декорации",
                        impacts: [0],
                        correct: 0
                    },
                    { 
                        name: "Изхвърляне на храна",
                        impacts: [5],
                        correct: 0
                    }
                ],
                successMessage: "Отлична работа! Избраните от теб дейности имат нисък въглероден отпечатък. Екологичните партита са забавни и полезни за планетата! Използването на многократни материали, местна храна и дигитални покани намалява значително въглеродния отпечатък на събитието.",
                failureMessage: "Опитай отново! Избери по-екологични опции. Препоръка: Избягвай пластмасовите и еднократни материали, балоните и импортираната храна. Използвай керамични чинии, местна храна и дигитални покани за по-нисък въглероден отпечатък."
            },
            {
                question: "Изчисляване на въглеродния отпечатък на семейно пътуване",
                scenario: "Твоето семейство планира ваканция. Използвай плъзгачите, за да настроиш различните аспекти на пътуването и да изчислиш общия въглероден отпечатък. Цел: Поддържай въглеродния отпечатък под 200 кг CO₂",
                type: "interactive",
                goal: 200,
                sliders: [
                    { 
                        name: "Разстояние (км)",
                        min: 0,
                        max: 1000,
                        step: 10,
                        default: 100,
                        unit: "",
                        formula: (val) => val * 0.63
                    },
                    { 
                        name: "Брой хора",
                        min: 1,
                        max: 10,
                        step: 1,
                        default: 4,
                        unit: "",
                        formula: (val) => val * 20
                    },
                    { 
                        name: "Брой дни",
                        min: 1,
                        max: 14,
                        step: 1,
                        default: 7,
                        unit: "",
                        formula: (val) => val * 30
                    },
                    { 
                        name: "Вид транспорт (1=велосипед, 2=влак, 3=автобус, 4=кола, 5=самолет)",
                        min: 1,
                        max: 5,
                        step: 1,
                        default: 4,
                        unit: "",
                        options: ["Велосипед", "Влак", "Автобус", "Кола", "Самолет"],
                        formula: (val) => {
                            const multipliers = [0, 0.5, 1, 2, 3.5];
                            return multipliers[val - 1] * 50;
                        }
                    }
                ],
                successMessage: "Отлична работа! Въглеродният отпечатък на пътуването зависи от разстоянието, вида транспорт, брой хора и продължителността на престоя. Самолетите имат най-висок въглероден отпечатък на човек, докато влаковете и автобусите са по-екологични!",
                failureMessage: "Опитай отново! Намали разстоянието, избери по-екологичен транспорт или намали продължителността на пътуването, за да постигнеш цел под 200 кг CO₂"
            },
            {
                question: "Планиране на екологичен ден",
                scenario: "Планирай вече ден от живота си, като избереш дейности с ниско въглеродно влияние. Цел: Поддържай въглероден отпечатък под 5 кг CO₂.",
                type: "interactive",
                goal: 5,
                sliders: [
                    { 
                        name: "Отиване за училище с велосипед/пеша",
                        impacts: [0],
                        correct: 0
                    },
                    { 
                        name: "Отиване за училище с кола",
                        impacts: [4],
                        correct: 0
                    },
                    { 
                        name: "Обяд с храна от бързо хранене",
                        impacts: [2],
                        correct: 0
                    },
                    { 
                        name: "Обяд с домашна вегетарианска храна",
                        impacts: [0.5],
                        correct: 0
                    },
                    { 
                        name: "Сортиране на боклук за рециклиране",
                        impacts: [0],
                        correct: 0
                    },
                    { 
                        name: "Изхвърляне на несортиран боклук",
                        impacts: [2],
                        correct: 0
                    },
                    { 
                        name: "Кратък душ (5 мин)",
                        impacts: [0.5],
                        correct: 0
                    },
                    { 
                        name: "Дълъг горещ душ (20+ мин)",
                        impacts: [2],
                        correct: 0
                    },
                    { 
                        name: "Покупка на нови дрехи",
                        impacts: [5],
                        correct: 0
                    },
                    { 
                        name: "Четене или игра навън",
                        impacts: [0],
                        correct: 0
                    },
                    { 
                        name: "Гледане на стрийминг (3+ часа)",
                        impacts: [1.5],
                        correct: 0
                    }
                ],
                successMessage: "Отлична работа! Избраните от теб дейности имат низък въглероден отпечатък. Малките ежедневни решения могат да направят голяма разлика за планетата! Транспортът с велосипед, вегетарианската храна и минималната употреба на енергия са ключови за намаляване на въглеродния отпечатък.",
                failureMessage: "Опитай отново! Избери по-екологични опции за ежедневните си дейности. Препоръка: Избягвай колата, бързото хранене и дългите души. Избери велосипед, домашна храна и кратки души за по-нисък въглероден отпечатък."
            }
        ]
    },
    en: {
        level1: [
            {
                question: "What is a carbon footprint?",
                options: ["A footprint made by shoes on coal", "Amount of carbon dioxide released from our activities", "A type of fuel for cars", "A special kind of plant"],
                correct: 1,
                explanation: "A carbon footprint is a measure of carbon dioxide and other greenhouse gases released into the atmosphere by human activities, organizations, or communities."
            },
            {
                question: "Which of these helps reduce carbon footprint?",
                options: ["Leaving lights on", "Using a bicycle", "Throwing trash anywhere", "Wasting water"],
                correct: 1,
                explanation: "Using a bicycle instead of a car reduces CO2 emissions and helps protect the environment. It's a clean and healthy way to travel."
            },
            {
                question: "What do trees do for the planet?",
                options: ["Pollute the air", "Clean the air and absorb CO2", "Nothing", "Make noise"],
                correct: 1,
                explanation: "Trees absorb carbon dioxide (CO2) from the air and produce oxygen through photosynthesis. They are natural air filters."
            },
            {
                question: "Why should we recycle?",
                options: ["To have more trash", "To save resources and reduce waste", "It doesn't matter", "Because it's fun"],
                correct: 1,
                explanation: "Recycling helps us reuse materials, saves natural resources, energy, and reduces the amount of waste in landfills."
            },
            {
                question: "How can we save energy at home?",
                options: ["Turn off lights when not using them", "Leave the TV on", "Open windows in winter", "Use lots of electricity"],
                correct: 0,
                explanation: "Turning off lights when not in use is a simple and effective way to save electricity and reduce our carbon footprint."
            }
        ],
        level2: [
            {
                question: "Travel to school",
                scenario: "You live 2 kilometers from school. How would you choose to travel there every day?",
                options: [
                    { text: "By car (parents drive you)", impact: "high" },
                    { text: "By public transport (bus)", impact: "medium" },
                    { text: "By bicycle or on foot", impact: "low" }
                ],
                correct: 2,
                explanations: {
                    high: "Using a car for short distances creates a high carbon footprint. Cars emit a lot of CO2, especially on short trips when the engine isn't warm.",
                    medium: "Public transport is better than a private car because it carries many people at once, but it still produces emissions.",
                    low: "Walking or cycling doesn't emit carbon emissions and is the most eco-friendly way to travel short distances."
                },
                impactLabels: {
                    high: "Carbon footprint: High",
                    medium: "Carbon footprint: Medium",
                    low: "Carbon footprint: Low"
                }
            },
            {
                question: "Lunch at school",
                scenario: "It's lunchtime at school. What choice will you make?",
                options: [
                    { text: "Buy packaged food from the store", impact: "high" },
                    { text: "Bring food from home in single-use plastic container", impact: "medium" },
                    { text: "Bring food from home in reusable container", impact: "low" }
                ],
                correct: 2,
                explanations: {
                    high: "Packaged food from stores often has multiple layers of packaging (plastic, cardboard, foil), creating lots of waste with a high carbon footprint.",
                    medium: "Single-use plastic containers are thrown away after one use, creating waste. Better than store packaging, but not ideal.",
                    low: "Reusable containers are used again and again, significantly reducing waste and carbon footprint."
                },
                impactLabels: {
                    high: "Carbon footprint: High",
                    medium: "Carbon footprint: Medium",
                    low: "Carbon footprint: Low"
                }
            },
            {
                question: "Free time",
                scenario: "You have a free afternoon. What would you choose to do?",
                options: [
                    { text: "Play video games or watch TV for several hours", impact: "medium" },
                    { text: "Go to the mall by car for shopping", impact: "high" },
                    { text: "Play outside with friends or read a book", impact: "low" }
                ],
                correct: 2,
                explanations: {
                    high: "Driving to the mall creates emissions from transport, and malls consume lots of energy for lighting, air conditioning, and escalators.",
                    medium: "Electronic devices consume energy, which leads to carbon emissions, especially when used for extended periods.",
                    low: "Outdoor play and reading don't require electricity and are the most eco-friendly ways to spend free time."
                },
                impactLabels: {
                    high: "Carbon footprint: High",
                    medium: "Carbon footprint: Medium",
                    low: "Carbon footprint: Low"
                }
            },
            {
                question: "Waste disposal",
                scenario: "You have different types of waste to throw away. What will you do?",
                options: [
                    { text: "Throw everything in one bin", impact: "high" },
                    { text: "Sort waste for recycling (plastic, paper, glass)", impact: "low" },
                    { text: "Throw most away, but recycle only when convenient", impact: "medium" }
                ],
                correct: 1,
                explanations: {
                    high: "Throwing everything in one bin means nothing gets recycled. This leads to full landfills and the need for new raw materials, which has a high carbon footprint.",
                    medium: "Partial recycling is better than none, but not as effective as complete sorting and recycling of waste.",
                    low: "Complete sorting and recycling allows materials to be reused, saves energy, and significantly reduces carbon footprint."
                },
                impactLabels: {
                    high: "Carbon footprint: High",
                    medium: "Carbon footprint: Medium",
                    low: "Carbon footprint: Low"
                }
            },
            {
                question: "Caring for the environment",
                scenario: "You see trash on the playground in the park. What do you do?",
                options: [
                    { text: "Ignore it - it's not my job", impact: "high" },
                    { text: "Pick it up and throw it in the nearest bin", impact: "medium" },
                    { text: "Pick it up and sort it into the appropriate recycling container", impact: "low" }
                ],
                correct: 2,
                explanations: {
                    high: "Leaving trash in nature pollutes the environment, harms animals and plants, and can take hundreds of years to decompose.",
                    medium: "Throwing in a bin is good, but without sorting, the full potential for recycling isn't utilized.",
                    low: "Sorting waste allows for recycling, which reduces the need for new raw materials and energy to produce new products."
                },
                impactLabels: {
                    high: "Carbon footprint: High",
                    medium: "Carbon footprint: Medium",
                    low: "Carbon footprint: Low"
                }
            }
        ],
        level3: [
            {
                question: "Planning an eco-friendly party",
                scenario: "You're organizing a birthday party. Choose the most eco-friendly options to reduce the event's carbon footprint. Goal: Keep carbon footprint below 3 kg CO₂",
                type: "interactive",
                goal: 3,
                sliders: [
                    { 
                        name: "Using reusable plates and cups",
                        impacts: [0],
                        correct: 0
                    },
                    { 
                        name: "Using disposable plastic plates and cups",
                        impacts: [5],
                        correct: 0
                    },
                    { 
                        name: "Serving food from local producers",
                        impacts: [0],
                        correct: 0
                    },
                    { 
                        name: "Serving exotic foods imported from distant countries",
                        impacts: [4],
                        correct: 0
                    },
                    { 
                        name: "Sending digital invitations",
                        impacts: [0],
                        correct: 0
                    },
                    { 
                        name: "Using paper invitations",
                        impacts: [2],
                        correct: 0
                    },
                    { 
                        name: "Releasing balloons into the air",
                        impacts: [6],
                        correct: 0
                    },
                    { 
                        name: "Using biodegradable decorations",
                        impacts: [0],
                        correct: 0
                    },
                    { 
                        name: "Throwing away food",
                        impacts: [5],
                        correct: 0
                    }
                ],
                successMessage: "Great work! Your chosen activities have a low carbon footprint. Eco-friendly parties are fun and good for the planet! Using reusable materials, local food, and digital invitations significantly reduces the event's carbon footprint.",
                failureMessage: "Try again! Choose more eco-friendly options. Recommendation: Avoid plastic and disposable materials, balloons, and imported food. Use ceramic plates, local food, and digital invitations for a lower carbon footprint."
            },
            {
                question: "Calculating the carbon footprint of a family trip",
                scenario: "Your family is planning a vacation. Use the sliders to adjust different aspects of the trip and calculate the total carbon footprint. Goal: Keep carbon footprint below 200 kg CO₂",
                type: "interactive",
                goal: 200,
                sliders: [
                    { 
                        name: "Distance (km)",
                        min: 0,
                        max: 1000,
                        step: 10,
                        default: 100,
                        unit: "",
                        formula: (val) => val * 0.63
                    },
                    { 
                        name: "Number of people",
                        min: 1,
                        max: 10,
                        step: 1,
                        default: 4,
                        unit: "",
                        formula: (val) => val * 20
                    },
                    { 
                        name: "Number of days",
                        min: 1,
                        max: 14,
                        step: 1,
                        default: 7,
                        unit: "",
                        formula: (val) => val * 30
                    },
                    { 
                        name: "Type of transport (1=bike, 2=train, 3=bus, 4=car, 5=plane)",
                        min: 1,
                        max: 5,
                        step: 1,
                        default: 4,
                        unit: "",
                        options: ["Bicycle", "Train", "Bus", "Car", "Plane"],
                        formula: (val) => {
                            const multipliers = [0, 0.5, 1, 2, 3.5];
                            return multipliers[val - 1] * 50;
                        }
                    }
                ],
                successMessage: "Great work! The carbon footprint of a trip depends on distance, type of transport, number of people, and duration of stay. Planes have the highest carbon footprint per person, while trains and buses are more eco-friendly!",
                failureMessage: "Try again! Reduce the distance, choose more eco-friendly transport, or shorten the trip duration to achieve a goal below 200 kg CO₂"
            },
            {
                question: "Planning an eco-friendly day",
                scenario: "Plan a day in your life by choosing activities with low carbon impact. Goal: Keep your carbon footprint below 5 kg CO₂.",
                type: "interactive",
                goal: 5,
                sliders: [
                    { 
                        name: "Going to school by bicycle/walking",
                        impacts: [0],
                        correct: 0
                    },
                    { 
                        name: "Going to school by car",
                        impacts: [4],
                        correct: 0
                    },
                    { 
                        name: "Lunch from fast food",
                        impacts: [2],
                        correct: 0
                    },
                    { 
                        name: "Lunch with home-cooked vegetarian food",
                        impacts: [0.5],
                        correct: 0
                    },
                    { 
                        name: "Sorting trash for recycling",
                        impacts: [0],
                        correct: 0
                    },
                    { 
                        name: "Throwing away unsorted trash",
                        impacts: [2],
                        correct: 0
                    },
                    { 
                        name: "Short shower (5 min)",
                        impacts: [0.5],
                        correct: 0
                    },
                    { 
                        name: "Long hot shower (20+ min)",
                        impacts: [2],
                        correct: 0
                    },
                    { 
                        name: "Buying new clothes",
                        impacts: [5],
                        correct: 0
                    },
                    { 
                        name: "Reading or playing outdoors",
                        impacts: [0],
                        correct: 0
                    },
                    { 
                        name: "Streaming (3+ hours)",
                        impacts: [1.5],
                        correct: 0
                    },

                ],
                successMessage: "Great work! Your chosen activities have a low carbon footprint. Small daily choices can make a big difference for the planet! Cycling, vegetarian food, and minimal energy use are key to reducing carbon footprint.",
                failureMessage: "Try again! Choose more eco-friendly options for your daily activities. Recommendation: Avoid cars, fast food, and long showers. Choose cycling, home-cooked food, and short showers for a lower carbon footprint."
            }
        ]
    }
};

let currentQuestionIndex = 0;
let score = 0;
let totalScore = 0; // Total score across all levels
let currentLevel = 'level1'; // Start with level 1

function startQuiz(level = 'level1') {
    currentQuestionIndex = 0;
    
    // Reset score only if starting level 1, otherwise keep accumulating
    if (level === 'level1') {
        score = 0;
        totalScore = 0;
    } else {
        score = 0; // Reset current level score
    }
    
    currentLevel = level;
    
    // Hide intro and show quiz content
    const quizIntro = document.getElementById('quizIntro');
    const quizContent = document.getElementById('quizContent');
    
    if (quizIntro) {
        quizIntro.style.display = 'none';
    }
    if (quizContent) {
        quizContent.style.display = 'block';
    }
    
    showQuestion();
}

function showQuestion() {
    const quizContent = document.getElementById('quizContent');
    const questions = quizData[currentLanguage][currentLevel];
    
    if (currentQuestionIndex >= questions.length) {
        showResult();
        return;
    }
    
    const question = questions[currentQuestionIndex];
    
    // Get level title
    const levelTitles = {
        bg: { level1: 'Ниво 1: Основни знания за въглеродния отпечатък', level2: 'Ниво 2: Ситуационни въпроси', level3: 'Ниво 3: Практически задачи' },
        en: { level1: 'Level 1: Basic Carbon Footprint Knowledge', level2: 'Level 2: Situational Questions', level3: 'Level 3: Practical Tasks' }
    };
    
    let html = `
        <div style="text-align: center; margin-bottom: 20px;">
            <h3 style="color: #667eea; font-size: 24px;">${levelTitles[currentLanguage][currentLevel]}</h3>
            <p style="color: #4a5568; font-size: 16px;">${currentLanguage === 'bg' ? 'Задача' : 'Task'} ${currentQuestionIndex + 1} ${currentLanguage === 'bg' ? 'от' : 'of'} ${questions.length}</p>
        </div>
        <div class="quiz-question" style="font-size: 22px; font-weight: 700; color: #2d3748; margin-bottom: 15px;">${question.question}</div>
    `;
    
    // Add scenario if exists (for level 2 and level 3)
    if (question.scenario) {
        html += `
            <div style="background: linear-gradient(135deg, #e0f2fe 0%, #e0e7ff 100%); padding: 20px; border-radius: 15px; margin-bottom: 25px; border-left: 4px solid #667eea;">
                <p style="color: #2d3748; font-size: 17px; line-height: 1.7; margin: 0;">${question.scenario}</p>
            </div>
        `;
    }
    
    // Check if this is an interactive question (Level 3)
    if (question.type === 'interactive' && question.sliders) {
        // Interactive sliders/checkboxes interface
        html += `<div class="interactive-container" style="background: #f7fafc; padding: 20px; border-radius: 15px; margin-bottom: 20px;">`;
        
        // Check if sliders have options (checkbox style) or range (slider style)
        const hasRangeSliders = question.sliders.some(slider => slider.min !== undefined);
        
        if (hasRangeSliders) {
            // Slider interface
            question.sliders.forEach((slider, idx) => {
                const defaultVal = slider.default || slider.min || 0;
                html += `
                    <div style="margin-bottom: 25px;">
                        <label style="display: block; color: #2d3748; font-weight: 600; margin-bottom: 10px;">${slider.name}</label>
                        <div style="display: flex; align-items: center; gap: 15px;">
                            <input type="range" 
                                id="slider_${idx}" 
                                class="interactive-slider"
                                min="${slider.min}" 
                                max="${slider.max}" 
                                step="${slider.step}" 
                                value="${defaultVal}"
                                style="flex: 1; height: 8px; border-radius: 5px; outline: none; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);"
                                oninput="updateSliderValue(${idx})">
                            <span id="slider_value_${idx}" style="min-width: 60px; font-weight: 700; color: #667eea; font-size: 18px;">${defaultVal}${slider.unit || ''}</span>
                        </div>
                        ${slider.options ? `<p id="slider_option_${idx}" style="color: #4a5568; font-size: 14px; margin-top: 5px;">${slider.options[defaultVal - 1]}</p>` : ''}
                        <p id="slider_impact_${idx}" style="color: #48bb78; font-size: 14px; margin-top: 5px;">${currentLanguage === 'bg' ? 'Общ' : 'Total'} ${currentLanguage === 'bg' ? 'въглероден отпечатък:' : 'carbon footprint:'} <span style="font-weight: 700;">0 ${currentLanguage === 'bg' ? 'кг' : 'kg'} CO₂</span></p>
                    </div>
                `;
            });
        } else {
            // Checkbox/option interface
            question.sliders.forEach((slider, idx) => {
                const impact = slider.impacts ? slider.impacts[0] : 0;
                html += `
                    <div style="margin-bottom: 15px;">
                        <label style="display: flex; align-items: center; color: #2d3748; font-weight: 500; cursor: pointer; padding: 12px; background: white; border-radius: 10px; border: 2px solid #e2e8f0; transition: all 0.2s; hover:border-color: #667eea;" onchange="updateCheckbox()">
                            <input type="checkbox" 
                                id="checkbox_${idx}" 
                                class="interactive-checkbox"
                                data-impact="${impact}"
                                style="margin-right: 12px; width: 20px; height: 20px; cursor: pointer;">
                            <span style="flex: 1;">${slider.name}</span>
                            <span style="color: ${impact === 0 ? '#48bb78' : '#f56565'}; font-weight: 700; font-size: 14px; margin-left: 10px;">${currentLanguage === 'bg' ? 'Общ' : ''} ${impact} ${currentLanguage === 'bg' ? 'кг' : 'kg'} CO₂</span>
                        </label>
                    </div>
                `;
            });
        }
        
        html += `</div>`;
        
        // Total carbon footprint display
        html += `
            <div id="total-footprint" style="background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); padding: 20px; border-radius: 15px; text-align: center; margin-bottom: 20px; border: 3px solid #f59e0b;">
                <p style="color: #78350f; font-size: 18px; margin-bottom: 5px;">${currentLanguage === 'bg' ? '📊 Общ въглероден отпечатък:' : '📊 Total carbon footprint:'}</p>
                <p id="footprint-value" style="color: #78350f; font-size: 32px; font-weight: 700; margin: 0;">0.0 ${currentLanguage === 'bg' ? 'кг' : 'kg'} CO₂</p>
                ${question.goal ? `<p style="color: #78350f; font-size: 14px; margin-top: 10px;">${currentLanguage === 'bg' ? 'Цел: под' : 'Goal: below'} ${question.goal} ${currentLanguage === 'bg' ? 'кг' : 'kg'} CO₂</p>` : ''}
            </div>
        `;
        
        // Submit button for interactive questions
        html += `<button class="quiz-button" onclick="checkInteractiveAnswer()" style="width: 100%; padding: 15px; font-size: 18px;">${currentLanguage === 'bg' ? 'Изчисли въглеродния отпечатък' : 'Calculate carbon footprint'}</button>`;
        
    } else {
        // Regular question interface
        html += `<div class="quiz-options">`;
        
        // Handle both array of strings and array of objects
        if (Array.isArray(question.options)) {
            question.options.forEach((option, index) => {
                const optionText = typeof option === 'string' ? option : option.text;
                html += `<button class="quiz-option" onclick="checkAnswer(${index})">${optionText}</button>`;
            });
        }
        
        html += `</div>`;
    }
    
    // Add progress bar
    const progress = ((currentQuestionIndex) / questions.length) * 100;
    html += `
        <div style="margin-top: 30px;">
            <div style="background: #e2e8f0; border-radius: 10px; height: 10px; overflow: hidden;">
                <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); height: 100%; width: ${progress}%; transition: width 0.3s ease;"></div>
            </div>
            <p style="text-align: center; margin-top: 10px; color: #4a5568;">${currentLanguage === 'bg' ? 'Точки:' : 'Score:'} ${score}/${questions.length}</p>
        </div>
    `;
    
    quizContent.innerHTML = html;
    
    // Initialize calculator if interactive
    if (question.type === 'interactive' && question.sliders) {
        updateInteractiveCalculator();
    }
}

function checkAnswer(selectedIndex) {
    const questions = quizData[currentLanguage][currentLevel];
    const question = questions[currentQuestionIndex];
    const options = document.querySelectorAll('.quiz-option');
    
    // Get the selected option's impact (if it exists)
    const selectedOption = Array.isArray(question.options) && typeof question.options[selectedIndex] === 'object' 
        ? question.options[selectedIndex] 
        : null;
    const selectedImpact = selectedOption ? selectedOption.impact : null;
    
    options.forEach((option, index) => {
        option.disabled = true;
        if (index === question.correct) {
            option.classList.add('correct');
        } else if (index === selectedIndex && selectedIndex !== question.correct) {
            option.classList.add('wrong');
        }
    });
    
    const isCorrect = selectedIndex === question.correct;
    
    if (isCorrect) {
        score++;
    }
    
    // Show explanation with impact indicator
    const quizContent = document.getElementById('quizContent');
    const explanationDiv = document.createElement('div');
    explanationDiv.className = 'explanation-box';
    
    // Determine background color based on impact
    let bgColor = isCorrect ? 'linear-gradient(135deg, #d4fc79 0%, #96e6a1 100%)' : 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)';
    let borderColor = isCorrect ? '#48bb78' : '#f56565';
    
    if (selectedImpact) {
        if (selectedImpact === 'low') {
            bgColor = 'linear-gradient(135deg, #d4fc79 0%, #96e6a1 100%)';
            borderColor = '#48bb78';
        } else if (selectedImpact === 'medium') {
            bgColor = 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)';
            borderColor = '#f59e0b';
        } else if (selectedImpact === 'high') {
            bgColor = 'linear-gradient(135deg, #fecaca 0%, #fca5a5 100%)';
            borderColor = '#ef4444';
        }
    }
    
    explanationDiv.style.cssText = `
        margin-top: 30px;
        padding: 20px;
        background: ${bgColor};
        border-radius: 15px;
        border-left: 5px solid ${borderColor};
    `;
    
    const correctText = currentLanguage === 'bg' ? 'Правилно!' : 'Correct!';
    const wrongText = currentLanguage === 'bg' ? 'Грешен отговор' : 'Wrong answer';
    
    // Get explanation based on impact level or use default
    let explanationText = question.explanation || '';
    if (question.explanations && selectedImpact) {
        explanationText = question.explanations[selectedImpact] || explanationText;
    }
    
    // Get impact label
    let impactLabel = '';
    if (question.impactLabels && selectedImpact) {
        impactLabel = question.impactLabels[selectedImpact];
    }
    
    explanationDiv.innerHTML = `
        <div style="display: flex; align-items: start; gap: 15px;">
            <div style="font-size: 30px;">${isCorrect ? '✅' : (selectedImpact === 'medium' ? '⚠️' : '❌')}</div>
            <div style="flex: 1;">
                <h4 style="color: #2d3748; font-size: 20px; margin-bottom: 10px;">${isCorrect ? correctText : wrongText}</h4>
                ${impactLabel ? `<p style="color: #2d3748; font-size: 18px; font-weight: 700; margin-bottom: 10px;">${impactLabel}</p>` : ''}
                ${explanationText ? `<p style="color: #4a5568; font-size: 16px; line-height: 1.6;">${explanationText}</p>` : ''}
            </div>
        </div>
    `;
    
    quizContent.appendChild(explanationDiv);
    
    // Check if this is the last question
    const isLastQuestion = currentQuestionIndex >= questions.length - 1;
    
    if (isCorrect) {
        if (isLastQuestion) {
            // Show "Finish Level" button
            const finishButtonText = currentLanguage === 'bg' ? 'Завърши нивото' : 'Finish Level';
            const finishButton = document.createElement('button');
            finishButton.className = 'quiz-button';
            finishButton.style.marginTop = '20px';
            finishButton.textContent = finishButtonText;
            finishButton.onclick = () => showResult();
            quizContent.appendChild(finishButton);
        } else {
            // Auto-advance to next question after correct answer
            setTimeout(() => {
                currentQuestionIndex++;
                showQuestion();
            }, 3000);
        }
    } else {
        // For wrong answers, show "Next Question" button
        const nextButtonText = currentLanguage === 'bg' ? 'Следващ въпрос' : 'Next Question';
        const nextButton = document.createElement('button');
        nextButton.className = 'quiz-button';
        nextButton.style.marginTop = '20px';
        nextButton.style.background = 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)';
        nextButton.textContent = nextButtonText;
        nextButton.onclick = () => {
            if (isLastQuestion) {
                showResult();
            } else {
                currentQuestionIndex++;
                showQuestion();
            }
        };
        quizContent.appendChild(nextButton);
    }
}

// Interactive calculator functions for Level 3
function updateSliderValue(index) {
    const slider = document.getElementById(`slider_${index}`);
    const valueDisplay = document.getElementById(`slider_value_${index}`);
    const optionDisplay = document.getElementById(`slider_option_${index}`);
    
    const questions = quizData[currentLanguage][currentLevel];
    const question = questions[currentQuestionIndex];
    const sliderConfig = question.sliders[index];
    
    if (valueDisplay) {
        valueDisplay.textContent = slider.value + (sliderConfig.unit || '');
    }
    
    // Update option text if exists
    if (optionDisplay && sliderConfig.options) {
        const optionIndex = parseInt(slider.value) - 1;
        if (sliderConfig.options[optionIndex]) {
            optionDisplay.textContent = sliderConfig.options[optionIndex];
        }
    }
    
    updateInteractiveCalculator();
}

function updateCheckbox() {
    updateInteractiveCalculator();
}

function updateInteractiveCalculator() {
    const questions = quizData[currentLanguage][currentLevel];
    const question = questions[currentQuestionIndex];
    
    if (!question || question.type !== 'interactive') return;
    
    let totalFootprint = 0;
    
    // Check if sliders have range (slider mode) or options (checkbox mode)
    const hasRangeSliders = question.sliders.some(slider => slider.min !== undefined);
    
    if (hasRangeSliders) {
        // Calculate from sliders
        question.sliders.forEach((slider, idx) => {
            const sliderElement = document.getElementById(`slider_${idx}`);
            if (sliderElement && slider.formula) {
                const value = parseFloat(sliderElement.value);
                const impact = slider.formula(value);
                totalFootprint += impact;
                
                // Update individual impact display
                const impactDisplay = document.getElementById(`slider_impact_${idx}`);
                if (impactDisplay) {
                    impactDisplay.innerHTML = `${currentLanguage === 'bg' ? 'Общ' : 'Total'} ${currentLanguage === 'bg' ? 'въглероден отпечатък:' : 'carbon footprint:'} <span style="font-weight: 700;">${impact.toFixed(1)} ${currentLanguage === 'bg' ? 'кг' : 'kg'} CO₂</span>`;
                }
            }
        });
    } else {
        // Calculate from checkboxes
        question.sliders.forEach((slider, idx) => {
            const checkbox = document.getElementById(`checkbox_${idx}`);
            if (checkbox && checkbox.checked) {
                const impact = parseFloat(checkbox.dataset.impact) || 0;
                totalFootprint += impact;
            }
        });
    }
    
    // Update total display
    const footprintDisplay = document.getElementById('footprint-value');
    if (footprintDisplay) {
        footprintDisplay.textContent = `${totalFootprint.toFixed(1)} ${currentLanguage === 'bg' ? 'кг' : 'kg'} CO₂`;
        
        // Change color based on goal
        const totalContainer = document.getElementById('total-footprint');
        if (question.goal && totalContainer) {
            if (totalFootprint <= question.goal) {
                totalContainer.style.background = 'linear-gradient(135deg, #d4fc79 0%, #96e6a1 100%)';
                totalContainer.style.borderColor = '#48bb78';
                footprintDisplay.style.color = '#22543d';
            } else {
                totalContainer.style.background = 'linear-gradient(135deg, #fecaca 0%, #fca5a5 100%)';
                totalContainer.style.borderColor = '#ef4444';
                footprintDisplay.style.color = '#7f1d1d';
            }
        }
    }
}

function checkInteractiveAnswer() {
    const questions = quizData[currentLanguage][currentLevel];
    const question = questions[currentQuestionIndex];
    
    let totalFootprint = 0;
    
    // Calculate total footprint
    const hasRangeSliders = question.sliders.some(slider => slider.min !== undefined);
    
    if (hasRangeSliders) {
        question.sliders.forEach((slider, idx) => {
            const sliderElement = document.getElementById(`slider_${idx}`);
            if (sliderElement && slider.formula) {
                const value = parseFloat(sliderElement.value);
                totalFootprint += slider.formula(value);
            }
        });
    } else {
        question.sliders.forEach((slider, idx) => {
            const checkbox = document.getElementById(`checkbox_${idx}`);
            if (checkbox && checkbox.checked) {
                const impact = parseFloat(checkbox.dataset.impact) || 0;
                totalFootprint += impact;
            }
        });
    }
    
    // Check if goal was met
    const isSuccess = question.goal ? totalFootprint <= question.goal : true;
    
    if (isSuccess) {
        score++;
    }
    
    // Show result
    const quizContent = document.getElementById('quizContent');
    const resultDiv = document.createElement('div');
    resultDiv.className = 'explanation-box';
    
    const bgColor = isSuccess ? 'linear-gradient(135deg, #d4fc79 0%, #96e6a1 100%)' : 'linear-gradient(135deg, #fecaca 0%, #fca5a5 100%)';
    const borderColor = isSuccess ? '#48bb78' : '#ef4444';
    
    resultDiv.style.cssText = `
        margin-top: 30px;
        padding: 20px;
        background: ${bgColor};
        border-radius: 15px;
        border-left: 5px solid ${borderColor};
    `;
    
    const titleText = isSuccess 
        ? (currentLanguage === 'bg' ? 'Отлична работа!' : 'Great work!')
        : (currentLanguage === 'bg' ? 'Опитай отново!' : 'Try again!');
    
    const message = isSuccess ? question.successMessage : question.failureMessage;
    
    resultDiv.innerHTML = `
        <div style="display: flex; align-items: start; gap: 15px;">
            <div style="font-size: 30px;">${isSuccess ? '✅' : '❌'}</div>
            <div style="flex: 1;">
                <h4 style="color: #2d3748; font-size: 20px; margin-bottom: 10px;">${titleText}</h4>
                <p style="color: #4a5568; font-size: 16px; line-height: 1.6;">${message}</p>
            </div>
        </div>
    `;
    
    quizContent.appendChild(resultDiv);
    
    // Disable the submit button
    const submitBtn = quizContent.querySelector('.quiz-button');
    if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.style.opacity = '0.5';
    }
    
    // Check if this is the last question
    const isLastQuestion = currentQuestionIndex >= questions.length - 1;
    
    if (isSuccess) {
        if (isLastQuestion) {
            const finishButtonText = currentLanguage === 'bg' ? 'Завърши нивото' : 'Finish Level';
            const finishButton = document.createElement('button');
            finishButton.className = 'quiz-button';
            finishButton.style.marginTop = '20px';
            finishButton.textContent = finishButtonText;
            finishButton.onclick = () => showResult();
            quizContent.appendChild(finishButton);
        } else {
            setTimeout(() => {
                currentQuestionIndex++;
                showQuestion();
            }, 3000);
        }
    } else {
        const nextButtonText = currentLanguage === 'bg' ? 'Следваща задача' : 'Next Task';
        const nextButton = document.createElement('button');
        nextButton.className = 'quiz-button';
        nextButton.style.marginTop = '20px';
        nextButton.style.background = 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)';
        nextButton.textContent = nextButtonText;
        nextButton.onclick = () => {
            if (isLastQuestion) {
                showResult();
            } else {
                currentQuestionIndex++;
                showQuestion();
            }
        };
        quizContent.appendChild(nextButton);
    }
}

function showResult() {
    // Add current level score to total score
    totalScore += score;
    
    const quizContent = document.getElementById('quizContent');
    const totalQuestions = quizData[currentLanguage][currentLevel].length;
    const percentage = (score / totalQuestions) * 100;
    
    // Calculate max possible total score based on completed levels
    const levelsCompleted = currentLevel === 'level1' ? 1 : (currentLevel === 'level2' ? 2 : 3);
    const maxTotalScore = levelsCompleted * 5; // Each level has 5 questions
    const totalPercentage = (totalScore / maxTotalScore) * 100;
    
    // Check if all levels are completed
    const allLevelsCompleted = currentLevel === 'level3';
    
    let message = '';
    let emoji = '';
    let finalComment = '';
    let award = '';
    
    if (allLevelsCompleted) {
        // Final result after all 3 levels
        const outOf30 = `${totalScore} ${currentLanguage === 'bg' ? 'от' : 'out of'} 30`;
        const percentageDisplay = `${Math.round(totalPercentage)}%`;
        
        if (totalPercentage === 100) {
            message = currentLanguage === 'bg' ? 'Поздравления!' : 'Congratulations!';
            emoji = '🏆';
            finalComment = currentLanguage === 'bg' 
                ? 'Ти завърши играта с 30 от 30 точки (100%)\n\nПерфектно! Ти си истински еко герой! Знаеш всичко за въглеродния отпечатък и как да опазиш планетата!' 
                : 'You finished the game with 30 out of 30 points (100%)\n\nPerfect! You are a true eco hero! You know everything about carbon footprint and how to protect the planet!';
            award = '🥇'; // Gold medal
        } else if (totalPercentage >= 80) {
            message = currentLanguage === 'bg' ? 'Поздравления!' : 'Congratulations!';
            emoji = '🏆';
            finalComment = currentLanguage === 'bg' 
                ? `Ти завърши играта с ${outOf30} точки (${percentageDisplay})\n\nБраво! Знаеш много за въглеродния отпечатък и околната среда! Продължавай да практикуваш екологичните навици!` 
                : `You finished the game with ${outOf30} points (${percentageDisplay})\n\nGreat! You know a lot about carbon footprint and the environment! Keep practicing eco-friendly habits!`;
            award = '🥈'; // Silver medal
        } else if (totalPercentage >= 60) {
            message = currentLanguage === 'bg' ? 'Поздравления!' : 'Congratulations!';
            emoji = '🏆';
            finalComment = currentLanguage === 'bg' 
                ? `Ти завърши играта с ${outOf30} точки (${percentageDisplay})\n\nДобре! Научи важни неща за въглеродния отпечатък. Продължавай да учиш и опитай отново, за да постигнеш по-висок резултат!` 
                : `You finished the game with ${outOf30} points (${percentageDisplay})\n\nGood! You learned important things about carbon footprint. Keep learning and try again to achieve a higher score!`;
            award = '🥉'; // Bronze medal
        } else {
            message = currentLanguage === 'bg' ? 'Поздравления!' : 'Congratulations!';
            emoji = '🏆';
            finalComment = currentLanguage === 'bg' 
                ? `Ти завърши играта с ${outOf30} точки (${percentageDisplay})\n\nПродължавай да учиш за въглеродния отпечатък и опитай отново, за да спечелиш постижения!` 
                : `You finished the game with ${outOf30} points (${percentageDisplay})\n\nKeep learning about carbon footprint and try again to earn achievements!`;
            award = '🎖️'; // Participation medal
        }
    } else {
        // Individual level result
        if (percentage === 100) {
            message = currentLanguage === 'bg' ? 'Перфектно! Ти си истински еко герой!' : 'Perfect! You are a true eco hero!';
            emoji = '🌟🏆';
        } else if (percentage >= 80) {
            message = currentLanguage === 'bg' ? 'Браво! Знаеш много за околната среда!' : 'Great! You know a lot about the environment!';
            emoji = '🎉👏';
        } else if (percentage >= 60) {
            message = currentLanguage === 'bg' ? 'Добре! Продължавай да учиш!' : 'Good! Keep learning!';
            emoji = '😊📚';
        } else {
            message = currentLanguage === 'bg' ? 'Не се притеснявай! Опитай отново!' : "Don't worry! Try again!";
            emoji = '💪🌱';
        }
    }
    
    const scoreText = currentLanguage === 'bg' ? 'Резултат за това ниво:' : 'Score for this level:';
    const totalScoreText = currentLanguage === 'bg' ? 'Общ резултат:' : 'Total score:';
    const outOf = currentLanguage === 'bg' ? 'от' : 'out of';
    const restartText = currentLanguage === 'bg' ? 'Играй отново' : 'Play Again';
    const backText = currentLanguage === 'bg' ? 'Обратно към нивата' : 'Back to Levels';
    const nextLevelText = currentLanguage === 'bg' ? 'Следващо ниво' : 'Next Level';
    const whatLearned = currentLanguage === 'bg' ? 'Какво научи:' : 'What you learned:';
    const shareText = currentLanguage === 'bg' ? 'Сподели наученото с приятели и семейство!' : 'Share what you learned with friends and family!';
    const betterPlace = currentLanguage === 'bg' ? 'Заедно можем да направим света по-добро място.' : 'Together we can make the world a better place.';
    
    let nextLevelButton = '';
    const nextLevel = currentLevel === 'level1' ? 'level2' : (currentLevel === 'level2' ? 'level3' : null);
    
    if (nextLevel && percentage >= 60 && !allLevelsCompleted) {
        nextLevelButton = `<button class="quiz-button" style="background: linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%); margin-top: 15px;" onclick="startQuiz('${nextLevel}')">${nextLevelText} ➜</button>`;
    }
    
    if (allLevelsCompleted) {
        // Final completion screen
        const learningPoints = currentLanguage === 'bg' ? [
            'Как ежедневните ни избори влияят на въглеродния отпечатък',
            'Начини за намаляване на въглеродния отпечатък в различни ситуации',
            'Как да изчисляваш и оценяваш въздействието на различни дейности върху околната среда',
            'Практически стъпки за по-екологичен начин на живот'
        ] : [
            'How our daily choices affect the carbon footprint',
            'Ways to reduce carbon footprint in different situations',
            'How to calculate and assess the impact of various activities on the environment',
            'Practical steps for a more eco-friendly lifestyle'
        ];
        
        quizContent.innerHTML = `
            <div class="quiz-result" style="max-width: 700px; margin: 0 auto;">
                <div style="font-size: 80px; margin-bottom: 20px;">${emoji}</div>
                <h2 style="color: #2d3748; font-size: 36px; margin-bottom: 15px;">${message}</h2>
                <div style="font-size: 120px; margin: 20px 0;">${award}</div>
                <div style="background: linear-gradient(135deg, #e0f2fe 0%, #e0e7ff 100%); padding: 25px; border-radius: 20px; margin: 25px 0; border-left: 5px solid #667eea; text-align: left;">
                    <p style="color: #2d3748; font-size: 18px; line-height: 1.8; white-space: pre-line; margin: 0;">${finalComment}</p>
                </div>
                
                <div style="background: white; padding: 25px; border-radius: 20px; margin: 25px 0; box-shadow: 0 4px 15px rgba(0,0,0,0.1); text-align: left;">
                    <h3 style="color: #667eea; font-size: 24px; margin-bottom: 20px;">${whatLearned}</h3>
                    <ul style="color: #4a5568; font-size: 16px; line-height: 1.8; margin: 0; padding-left: 25px;">
                        ${learningPoints.map(point => `<li style="margin-bottom: 12px;">${point}</li>`).join('')}
                    </ul>
                </div>
                
                <div style="background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); padding: 20px; border-radius: 15px; margin: 25px 0; border: 3px solid #f59e0b;">
                    <p style="color: #78350f; font-size: 16px; line-height: 1.6; margin: 0;">
                        ${shareText}<br><br>
                        ${betterPlace}
                    </p>
                </div>
                
                <button class="quiz-button" onclick="location.reload()" style="margin-top: 20px;">${restartText}</button>
                <button class="quiz-button" style="background: linear-gradient(135deg, #fa709a 0%, #fee140 100%); margin-top: 15px;" onclick="backToLevels()">${backText}</button>
            </div>
        `;
    } else {
        // Individual level result screen
        quizContent.innerHTML = `
            <div class="quiz-result">
                <div style="font-size: 60px; margin-bottom: 20px;">${emoji}</div>
                <p>${message}</p>
                <p style="margin-top: 20px; font-size: 28px; color: #667eea;">
                    ${scoreText} ${score} ${outOf} ${totalQuestions}
                </p>
                ${levelsCompleted > 1 ? `<p style="margin-top: 10px; font-size: 24px; color: #48bb78; font-weight: 700;">
                    ${totalScoreText} ${totalScore} ${outOf} ${maxTotalScore}
                </p>` : ''}
                <button class="quiz-button" onclick="startQuiz('${currentLevel}')">${restartText}</button>
                ${nextLevelButton}
                <button class="quiz-button" style="background: linear-gradient(135deg, #fa709a 0%, #fee140 100%); margin-top: 15px;" onclick="backToLevels()">${backText}</button>
            </div>
        `;
    }
}

function backToLevels() {
    const quizIntro = document.getElementById('quizIntro');
    const quizContent = document.getElementById('quizContent');
    
    if (quizIntro) {
        quizIntro.style.display = 'block';
    }
    if (quizContent) {
        quizContent.style.display = 'none';
    }
}

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    updateLanguage();
    
    // Add smooth scroll to navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
});
