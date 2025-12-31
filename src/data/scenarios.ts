export interface Scenario {
  id: string;
  question: string;
  scenario: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  imagePrompt: string;
}

export interface CategoryScenarios {
  [key: string]: Scenario[];
}

export const scenariosByCategory: CategoryScenarios = {
  "women-safety": [
    {
      id: "ws-1",
      question: "You notice someone following you on your way home from work. The street is getting darker and less crowded.",
      scenario: "Street Following",
      options: [
        "Confront the person directly and demand they stop",
        "Enter the nearest open store or public place and call for help",
        "Start running as fast as you can",
        "Ignore them and continue walking normally"
      ],
      correctAnswer: 1,
      explanation: "Entering a public place provides immediate safety and witnesses. Confrontation can escalate danger, running may tire you out, and ignoring may allow the situation to worsen.",
      imagePrompt: "evening city street with shops and streetlights, woman walking safely"
    },
    {
      id: "ws-2",
      question: "At a party, someone keeps touching you inappropriately despite you saying no. Others around don't seem to notice.",
      scenario: "Party Harassment",
      options: [
        "Leave quietly without making a scene",
        "Loudly and firmly say 'STOP TOUCHING ME' to draw attention",
        "Wait for them to stop on their own",
        "Push them away aggressively"
      ],
      correctAnswer: 1,
      explanation: "Being loud and clear draws witnesses and often shocks the harasser into stopping. Silence enables the behavior, aggression can backfire legally, and waiting normalizes abuse.",
      imagePrompt: "crowded party scene with people, social gathering environment"
    },
    {
      id: "ws-3",
      question: "You're in a taxi and realize the driver is taking an unfamiliar route. It's late at night.",
      scenario: "Suspicious Taxi Route",
      options: [
        "Immediately jump out of the moving car",
        "Stay calm, share your live location with someone, and ask the driver to return to the main road",
        "Start screaming at the driver",
        "Do nothing and hope for the best"
      ],
      correctAnswer: 1,
      explanation: "Staying calm while alerting others and questioning the driver is safest. Jumping from a moving car is dangerous, screaming may escalate, and doing nothing leaves you vulnerable.",
      imagePrompt: "interior of taxi at night, city lights through window, GPS navigation"
    },
    {
      id: "ws-4",
      question: "You receive threatening messages from an ex-partner who says they know where you live and work.",
      scenario: "Digital Stalking",
      options: [
        "Block them and ignore the threats",
        "Document everything, inform trusted people, and report to police",
        "Respond with counter-threats",
        "Change your social media privacy but take no other action"
      ],
      correctAnswer: 1,
      explanation: "Documentation creates evidence, informing others provides a safety network, and police reports establish a legal trail. Simply blocking or counter-threatening doesn't address the real danger.",
      imagePrompt: "smartphone screen showing messages, person looking concerned, home office setting"
    },
    {
      id: "ws-5",
      question: "You're waiting for public transport late at night and a group of intoxicated strangers starts making inappropriate comments.",
      scenario: "Public Transport Harassment",
      options: [
        "Engage in conversation to try to calm them down",
        "Move to a well-lit area near other people or security, and be ready to call for help",
        "Verbally confront them about their behavior",
        "Stay exactly where you are and avoid eye contact"
      ],
      correctAnswer: 1,
      explanation: "Moving to safety near witnesses or security reduces risk. Engaging or confronting intoxicated people is unpredictable, and staying still in an isolated spot leaves you vulnerable.",
      imagePrompt: "bus stop at night with street lighting, urban public transport scene"
    }
  ],
  "animal-safety": [
    {
      id: "as-1",
      question: "A stray dog approaches you aggressively, barking and showing teeth. You're in an open area.",
      scenario: "Aggressive Stray Dog",
      options: [
        "Run away as fast as possible",
        "Stand still, avoid eye contact, and slowly back away without turning your back",
        "Stare directly at the dog to show dominance",
        "Throw something at the dog to scare it away"
      ],
      correctAnswer: 1,
      explanation: "Standing still prevents triggering chase instinct. Slow retreat without turning keeps you safe. Running triggers pursuit, staring is seen as a challenge, and throwing things may provoke attack.",
      imagePrompt: "street scene with stray dog, person standing calmly, urban environment"
    },
    {
      id: "as-2",
      question: "While hiking, you encounter a snake on the trail. It's coiled and watching you.",
      scenario: "Snake Encounter",
      options: [
        "Try to identify the species by getting closer",
        "Freeze, then slowly back away while watching the snake",
        "Jump over the snake to continue your hike",
        "Poke it with a stick to make it move"
      ],
      correctAnswer: 1,
      explanation: "Freezing prevents startling the snake, and slow retreat gives it space to escape. Approaching, jumping over, or poking could trigger a defensive strike.",
      imagePrompt: "hiking trail in forest, coiled snake on path, nature setting"
    },
    {
      id: "as-3",
      question: "You're at a friend's house and their usually friendly dog suddenly growls when you reach for your bag.",
      scenario: "Familiar Dog Aggression",
      options: [
        "Quickly grab your bag and move away",
        "Freeze, speak calmly, and slowly withdraw your hand without sudden movements",
        "Pet the dog to calm it down",
        "Make loud noises to assert dominance"
      ],
      correctAnswer: 1,
      explanation: "Freezing and calm withdrawal reduces threat perception. Quick movements, touching, or loud noises can escalate the dog's defensive reaction.",
      imagePrompt: "living room with dog, person carefully moving away, domestic setting"
    },
    {
      id: "as-4",
      question: "A swarm of bees starts gathering around you while you're in a park.",
      scenario: "Bee Swarm",
      options: [
        "Swat at the bees to keep them away",
        "Walk calmly and quickly away from the area, covering your face",
        "Jump into the nearest water body",
        "Stand completely still until they leave"
      ],
      correctAnswer: 1,
      explanation: "Calm, quick movement away reduces sting risk. Swatting provokes attack, water doesn't help (bees wait), and standing still near a swarm is dangerous.",
      imagePrompt: "park scene with bee swarm, person walking away calmly, nature"
    },
    {
      id: "as-5",
      question: "While camping, you wake up to find a bear outside your tent sniffing around your food storage.",
      scenario: "Bear at Campsite",
      options: [
        "Make loud noises to scare it away immediately",
        "Stay quiet, don't make eye contact, and wait for the bear to leave on its own",
        "Play dead right away",
        "Try to retrieve your food while the bear is distracted"
      ],
      correctAnswer: 1,
      explanation: "For non-aggressive bears, staying quiet and non-threatening allows them to leave peacefully. Sudden noises may startle, playing dead is for attacks, and approaching is extremely dangerous.",
      imagePrompt: "camping tent at dawn, bear silhouette nearby, forest setting"
    }
  ],
  "road-accidents": [
    {
      id: "ra-1",
      question: "You witness a motorcycle accident. The rider is lying on the road and not moving, but is breathing.",
      scenario: "Motorcycle Accident Victim",
      options: [
        "Remove their helmet immediately to help them breathe better",
        "Don't move them, call emergency services, and monitor their breathing",
        "Help them sit up and offer water",
        "Move them to the sidewalk to get them out of traffic"
      ],
      correctAnswer: 1,
      explanation: "Spinal injuries are common in motorcycle accidents. Moving the victim or removing helmet could cause paralysis. Call for help and protect the scene.",
      imagePrompt: "road accident scene with motorcycle, person providing careful aid, emergency"
    },
    {
      id: "ra-2",
      question: "Your car's brakes fail while driving downhill on a busy road.",
      scenario: "Brake Failure",
      options: [
        "Turn off the engine immediately",
        "Pump the brakes, downshift to lower gear, use emergency brake gradually, and look for safe exit",
        "Steer into oncoming traffic to avoid pedestrians",
        "Open the door and jump out"
      ],
      correctAnswer: 1,
      explanation: "Pumping may restore pressure, downshifting slows the car, and gradual emergency brake prevents spinning. Turning off engine removes power steering, and jumping is extremely dangerous.",
      imagePrompt: "car dashboard showing controls, steep road ahead, driver focused"
    },
    {
      id: "ra-3",
      question: "You're first to arrive at a car accident scene with a vehicle that's smoking from the engine.",
      scenario: "Smoking Vehicle After Crash",
      options: [
        "Try to put out the smoke with water",
        "Check if occupants can be safely moved away from the vehicle, call emergency services",
        "Wait in your car for authorities to arrive",
        "Get close to the engine to assess the damage"
      ],
      correctAnswer: 1,
      explanation: "Priority is getting people away from fire risk and calling help. Water on engine fires can be dangerous, staying back doesn't help victims, and approaching smoking engines is risky.",
      imagePrompt: "car accident with smoke from hood, first responder helping, roadside"
    },
    {
      id: "ra-4",
      question: "While driving in rain, your car starts hydroplaning and you're losing control.",
      scenario: "Car Hydroplaning",
      options: [
        "Slam on the brakes to stop the car",
        "Ease off the accelerator, hold steering steady, and don't brake suddenly",
        "Turn the wheel sharply in the opposite direction",
        "Accelerate to regain traction"
      ],
      correctAnswer: 1,
      explanation: "Easing off and holding steady allows tires to regain contact. Braking locks wheels, sharp turns cause spins, and accelerating worsens loss of control.",
      imagePrompt: "rainy road with water on surface, car driving carefully, wet conditions"
    },
    {
      id: "ra-5",
      question: "You're stuck in traffic and smell burning from your engine. Temperature gauge is in the red zone.",
      scenario: "Engine Overheating",
      options: [
        "Keep driving slowly and turn on the AC to cool down",
        "Turn off AC, turn on heater, pull over safely, and turn off engine",
        "Pour cold water on the radiator immediately",
        "Rev the engine to push coolant through faster"
      ],
      correctAnswer: 1,
      explanation: "Heater draws heat from engine, stopping prevents damage. Cold water on hot radiator can crack it, AC adds load, and revving generates more heat.",
      imagePrompt: "car dashboard with warning lights, steam from hood, traffic scene"
    }
  ],
  "campus-emergencies": [
    {
      id: "ce-1",
      question: "You hear what sounds like gunshots in a building on campus. You're in a classroom.",
      scenario: "Active Shooter Alert",
      options: [
        "Go to the hallway to see what's happening",
        "Lock/barricade the door, turn off lights, silence phones, hide away from windows and doors",
        "Run out of the building immediately using the main exit",
        "Call your parents first to let them know"
      ],
      correctAnswer: 1,
      explanation: "Lockdown protocol (Run-Hide-Fight) prioritizes hiding when escape isn't safe. Investigating exposes you to danger, main exits may be blocked, and delayed action risks lives.",
      imagePrompt: "classroom with students hiding safely, locked door, emergency situation"
    },
    {
      id: "ce-2",
      question: "A student near you in the cafeteria starts choking and cannot speak or cough.",
      scenario: "Student Choking",
      options: [
        "Give them water to wash down the food",
        "Perform abdominal thrusts (Heimlich maneuver) and call for help",
        "Pat them on the back continuously",
        "Wait to see if they can clear it themselves"
      ],
      correctAnswer: 1,
      explanation: "Abdominal thrusts can dislodge obstructions. Water can worsen blockage, back pats alone are insufficient for severe choking, and waiting wastes critical time.",
      imagePrompt: "cafeteria scene with first aid response, Heimlich maneuver demonstration"
    },
    {
      id: "ce-3",
      question: "The fire alarm goes off during an exam. Some students want to stay and finish the test.",
      scenario: "Fire Alarm During Exam",
      options: [
        "Let those who want to stay continue, it's probably a drill",
        "Evacuate immediately following the marked exit routes, leaving belongings behind",
        "Check the hallway for smoke before deciding",
        "Gather all your belongings carefully, then leave"
      ],
      correctAnswer: 1,
      explanation: "All fire alarms require immediate evacuation. Assuming it's a drill, checking conditions, or gathering items wastes crucial evacuation time.",
      imagePrompt: "exam hall with fire alarm, students evacuating orderly, emergency exits"
    },
    {
      id: "ce-4",
      question: "You find a classmate in the bathroom having what appears to be a seizure.",
      scenario: "Seizure in Bathroom",
      options: [
        "Hold them down to stop the convulsions",
        "Clear the area of hard objects, protect their head, time the seizure, and call for help",
        "Put something in their mouth to prevent tongue biting",
        "Pour cold water on their face to wake them up"
      ],
      correctAnswer: 1,
      explanation: "Clearing hazards and protecting the head prevents injury. Restraining can cause harm, nothing should go in mouth (tongue swallowing is a myth), and water doesn't help.",
      imagePrompt: "bathroom setting with person providing careful first aid, safety focus"
    },
    {
      id: "ce-5",
      question: "During a chemistry lab, a classmate accidentally spills acid on their arm. They're panicking.",
      scenario: "Acid Spill on Skin",
      options: [
        "Apply ice immediately to neutralize the burn",
        "Rinse with cool running water for at least 20 minutes while removing contaminated clothing",
        "Wipe the acid off with a dry cloth first",
        "Apply butter or lotion to soothe the burn"
      ],
      correctAnswer: 1,
      explanation: "Continuous water flow dilutes and removes acid. Ice can cause tissue damage, wiping spreads the acid, and butter/lotion trap heat and chemicals.",
      imagePrompt: "chemistry laboratory with safety shower, emergency eye wash station"
    }
  ],
  "natural-disasters": [
    {
      id: "nd-1",
      question: "You feel the ground shaking violently while inside a building. Objects are falling.",
      scenario: "Earthquake Indoors",
      options: [
        "Run outside immediately to get away from the building",
        "Drop, Cover under sturdy furniture, and Hold On until shaking stops",
        "Stand in a doorway for protection",
        "Run to the basement for safety"
      ],
      correctAnswer: 1,
      explanation: "Drop, Cover, Hold On protects from falling debris. Running during shaking causes injuries, doorways aren't safer in modern buildings, basements can trap you.",
      imagePrompt: "office room during earthquake, person under desk, items falling"
    },
    {
      id: "nd-2",
      question: "You're at the beach and suddenly the water recedes much farther than normal.",
      scenario: "Tsunami Warning Sign",
      options: [
        "Go closer to see the exposed ocean floor - it's a rare sight",
        "Immediately move to high ground or inland as far as possible",
        "Wait on the beach to see what happens",
        "Try to collect the fish left on the exposed beach"
      ],
      correctAnswer: 1,
      explanation: "Receding water is a classic tsunami warning sign. You have minutes to reach high ground. Staying on the beach for any reason is life-threatening.",
      imagePrompt: "beach with receding water, people evacuating to hills, coastal emergency"
    },
    {
      id: "nd-3",
      question: "A flash flood warning is issued while you're driving through a low-lying area. Water is starting to cover the road.",
      scenario: "Flash Flood While Driving",
      options: [
        "Drive faster to get through the water before it rises",
        "Turn around, don't drown - find alternate route to higher ground",
        "Wait in your car for the water to recede",
        "Open windows slightly to equalize pressure if water rises"
      ],
      correctAnswer: 1,
      explanation: "Turn Around Don't Drown - just 6 inches of water can knock you down, 2 feet can float a car. Never attempt to cross flooded roads.",
      imagePrompt: "flooded road with water covering, car turning around, storm conditions"
    },
    {
      id: "nd-4",
      question: "You're outdoors when a tornado warning siren sounds. The sky is greenish and you see rotation in the clouds.",
      scenario: "Tornado Warning Outdoors",
      options: [
        "Try to outrun the tornado in your car",
        "Find a sturdy building or lie flat in a low ditch covering your head",
        "Hide under a highway overpass",
        "Take photos for social media before seeking shelter"
      ],
      correctAnswer: 1,
      explanation: "Low ground and head protection are best when buildings aren't available. Overpasses act as wind tunnels, cars can become projectiles, and delays can be fatal.",
      imagePrompt: "stormy sky with tornado in distance, person seeking shelter, dramatic weather"
    },
    {
      id: "nd-5",
      question: "After an earthquake, you smell gas in your home. The shaking has stopped.",
      scenario: "Gas Leak After Earthquake",
      options: [
        "Turn on lights to check for damage",
        "Leave immediately, don't use electrical switches, shut off gas if safe, and call from outside",
        "Open all windows to ventilate before leaving",
        "Use a flashlight to find the gas shutoff valve"
      ],
      correctAnswer: 1,
      explanation: "Gas + spark = explosion. Leave first, then call utility company. Even light switches or flashlights (unless intrinsically safe) can ignite gas.",
      imagePrompt: "house exterior after earthquake, family evacuating safely, utility workers"
    }
  ],
  "fire-emergencies": [
    {
      id: "fe-1",
      question: "You wake up to smoke filling your bedroom. You can hear the smoke alarm going off.",
      scenario: "Bedroom Fire at Night",
      options: [
        "Open the bedroom door quickly to see where the fire is",
        "Stay low, check door with back of hand before opening, and use alternate exit if hot",
        "Break the window and jump out immediately",
        "Hide under the bed where there's less smoke"
      ],
      correctAnswer: 1,
      explanation: "Stay low where air is clearer, test doors before opening (hot door = fire behind it). Jumping from height is dangerous, hiding traps you with smoke.",
      imagePrompt: "bedroom with smoke, person crawling low to ground, emergency evacuation"
    },
    {
      id: "fe-2",
      question: "A grease fire erupts in your kitchen pan while you're cooking.",
      scenario: "Kitchen Grease Fire",
      options: [
        "Pour water on it to put out the flames",
        "Turn off heat, carefully slide a metal lid over the pan, never move the pan",
        "Blow on the flames to put them out",
        "Throw flour on the fire to smother it"
      ],
      correctAnswer: 1,
      explanation: "A lid smothers fire by cutting oxygen. Water causes explosive splatter, blowing spreads flames, flour is combustible and can explode. Use baking soda if needed, never flour.",
      imagePrompt: "kitchen with pan fire, person using lid safely, cooking safety"
    },
    {
      id: "fe-3",
      question: "Your clothing catches fire from a candle or stove flame.",
      scenario: "Clothing on Fire",
      options: [
        "Run to find water or a fire extinguisher",
        "Stop, Drop to the ground, and Roll to smother flames",
        "Pat the flames with your hands",
        "Try to remove the burning clothing as fast as possible"
      ],
      correctAnswer: 1,
      explanation: "Stop Drop Roll smothers flames with ground contact. Running fans flames, hands get burned, and removing clothing can spread fire and cause more burns.",
      imagePrompt: "person demonstrating stop drop roll, fire safety training"
    },
    {
      id: "fe-4",
      question: "You're in an office building when the fire alarm sounds. The stairwell door feels warm to the touch.",
      scenario: "Office Building Fire",
      options: [
        "Open the door carefully and look for smoke",
        "Don't open that door - find an alternate stairwell or shelter in place away from the fire",
        "Use the elevator to evacuate faster",
        "Break through the door quickly before fire spreads"
      ],
      correctAnswer: 1,
      explanation: "A hot door indicates fire behind it - opening it can cause backdraft or let fire in. Find another route, signal from window if trapped. Never use elevators in fires.",
      imagePrompt: "office building stairwell, fire evacuation signs, emergency lighting"
    },
    {
      id: "fe-5",
      question: "You find someone with severe burns on their arm. The fire is out but they're in pain.",
      scenario: "Burn First Aid",
      options: [
        "Apply butter or toothpaste to cool the burn",
        "Cool with running water for at least 20 minutes, cover loosely with clean material, seek medical help",
        "Pop any blisters to release the pressure",
        "Apply ice directly to reduce swelling quickly"
      ],
      correctAnswer: 1,
      explanation: "Cool water reduces damage, loose covering protects. Butter/toothpaste trap heat, popping blisters causes infection, and ice can cause frostbite on damaged skin.",
      imagePrompt: "first aid for burns, cool water treatment, medical care"
    }
  ],
  "mental-crisis": [
    {
      id: "mc-1",
      question: "Your friend tells you they've been thinking about ending their life. They seem serious.",
      scenario: "Suicidal Ideation Disclosure",
      options: [
        "Tell them they're being dramatic and should think positively",
        "Listen without judgment, take it seriously, stay with them, and help connect them to crisis support",
        "Promise to keep it secret if they ask you to",
        "Change the subject to distract them"
      ],
      correctAnswer: 1,
      explanation: "Taking it seriously and staying present saves lives. Dismissing invalidates their pain, secrets prevent help, and distraction delays critical intervention.",
      imagePrompt: "two people having supportive conversation, caring interaction, mental health"
    },
    {
      id: "mc-2",
      question: "A colleague starts hyperventilating and says they can't breathe. They're having a panic attack.",
      scenario: "Panic Attack",
      options: [
        "Tell them to calm down and stop overreacting",
        "Stay calm, help them breathe slowly, ground them with the 5-4-3-2-1 technique",
        "Give them a paper bag to breathe into",
        "Leave them alone to work through it privately"
      ],
      correctAnswer: 1,
      explanation: "Calm presence and grounding techniques help. Telling someone to calm down increases anxiety, paper bags can cause CO2 issues, and leaving them alone increases fear.",
      imagePrompt: "office setting with person helping colleague breathe, supportive environment"
    },
    {
      id: "mc-3",
      question: "You notice a student sitting alone, appearing very withdrawn, with unexplained bruises on their arms.",
      scenario: "Signs of Self-Harm",
      options: [
        "Publicly ask them about the bruises in front of others",
        "Approach privately with care, express concern without judgment, encourage them to talk to a counselor",
        "Ignore it - it's not your business",
        "Report them to authorities immediately without talking to them"
      ],
      correctAnswer: 1,
      explanation: "Private, caring approach builds trust. Public confrontation shames them, ignoring enables harm, and immediate reporting without connection may break trust.",
      imagePrompt: "school setting with counselor offering support, private caring conversation"
    },
    {
      id: "mc-4",
      question: "During a crisis situation, you feel yourself becoming overwhelmed with anxiety and starting to freeze up.",
      scenario: "Personal Anxiety During Crisis",
      options: [
        "Push through and ignore your feelings",
        "Take a few deep breaths, acknowledge your feelings, focus on one small immediate action",
        "Remove yourself from the situation entirely",
        "Let your emotions guide your actions in the moment"
      ],
      correctAnswer: 1,
      explanation: "Acknowledging feelings while taking focused action manages anxiety. Suppressing causes later problems, complete withdrawal may not be possible, and emotional reactions may not be safe.",
      imagePrompt: "person practicing deep breathing, calming techniques, stress management"
    },
    {
      id: "mc-5",
      question: "A family member is experiencing severe grief after a loss and refuses to eat or leave their room for days.",
      scenario: "Severe Grief Response",
      options: [
        "Tell them to be strong and move on - they're making everyone worried",
        "Be present, gently offer food and company, validate their grief, and seek professional help if prolonged",
        "Give them complete space and wait for them to reach out",
        "Plan activities to distract them from thinking about the loss"
      ],
      correctAnswer: 1,
      explanation: "Gentle presence and validation support healthy grieving. Pressure to 'be strong' invalidates grief, complete isolation can worsen depression, and distraction delays processing.",
      imagePrompt: "family member offering comfort, grief support, caring presence at home"
    }
  ],
  "laboratory-safety": [
    {
      id: "ls-1",
      question: "While pipetting, you accidentally splash an unknown chemical into your eye.",
      scenario: "Chemical Eye Splash",
      options: [
        "Rub your eye to remove the chemical faster",
        "Use the emergency eyewash station, flush for at least 15-20 minutes, hold eyelids open",
        "Wait to see if it starts burning before taking action",
        "Rinse quickly with water from the tap and continue working"
      ],
      correctAnswer: 1,
      explanation: "Extended flushing dilutes and removes chemicals. Rubbing spreads damage, waiting allows deeper penetration, and quick rinses are insufficient for chemical exposure.",
      imagePrompt: "laboratory with eyewash station, person flushing eyes, safety equipment"
    },
    {
      id: "ls-2",
      question: "You notice a strong, unusual chemical odor in the lab that wasn't there before.",
      scenario: "Unknown Chemical Odor",
      options: [
        "Try to identify the source by smelling different containers",
        "Alert others, evacuate the area, and report to the lab supervisor or safety officer",
        "Open windows and continue working",
        "Assume someone just opened a container and it will dissipate"
      ],
      correctAnswer: 1,
      explanation: "Unknown chemical exposure can be toxic. Evacuation and reporting ensures proper response. Never sniff to identify chemicals, and assumptions about safety can be dangerous.",
      imagePrompt: "laboratory with ventilation system, emergency evacuation, chemical safety"
    },
    {
      id: "ls-3",
      question: "A glass beaker breaks and spills a corrosive liquid on your lab bench and floor.",
      scenario: "Corrosive Spill",
      options: [
        "Quickly wipe it up with paper towels before it spreads",
        "Alert others, contain spill with appropriate absorbent, use neutralizing agent if trained, and report",
        "Leave it for the cleaning staff to handle",
        "Pour water on it to dilute the concentration"
      ],
      correctAnswer: 1,
      explanation: "Proper spill response requires appropriate materials and training. Paper towels spread contamination, leaving it endangers others, and water may cause reactions or spread.",
      imagePrompt: "laboratory spill cleanup with proper PPE, safety protocols in action"
    },
    {
      id: "ls-4",
      question: "You realize you've been working with a chemical for an hour without the required fume hood.",
      scenario: "Improper Ventilation Exposure",
      options: [
        "Continue working since you feel fine",
        "Stop work immediately, move to fresh air, report the exposure, and seek medical evaluation if needed",
        "Open a window and continue more carefully",
        "Just use the fume hood for the remaining work"
      ],
      correctAnswer: 1,
      explanation: "Many chemical effects are delayed. Fresh air and medical evaluation catch early symptoms. Feeling fine doesn't mean no exposure, and symptoms may appear later.",
      imagePrompt: "laboratory fume hood, proper ventilation setup, safety training"
    },
    {
      id: "ls-5",
      question: "A pressurized gas cylinder tips over and the valve breaks off. Gas is escaping rapidly.",
      scenario: "Gas Cylinder Failure",
      options: [
        "Try to catch the cylinder and right it immediately",
        "Evacuate the area immediately, alert others, call emergency services from a safe distance",
        "Attempt to cover the broken valve to slow the leak",
        "Wait for the gas to empty out before leaving"
      ],
      correctAnswer: 1,
      explanation: "A broken cylinder valve creates a dangerous projectile and toxic/explosive atmosphere. Evacuation is critical. Attempting to fix it can result in serious injury or death.",
      imagePrompt: "laboratory with gas cylinders, emergency evacuation, safety response"
    }
  ],
  "environmental-hazards": [
    {
      id: "eh-1",
      question: "You smell a strong odor like rotten eggs near your home, which could indicate a gas leak.",
      scenario: "Natural Gas Leak",
      options: [
        "Turn on lights to look for the source",
        "Leave immediately without using any electrical switches, call gas company from outside",
        "Open windows and wait to see if the smell goes away",
        "Light a match to help locate where the gas is coming from"
      ],
      correctAnswer: 1,
      explanation: "Natural gas is explosive. Any spark from switches or flames can cause an explosion. Leave first, then call for help from a safe distance.",
      imagePrompt: "neighborhood with gas utility worker, evacuation, safety response"
    },
    {
      id: "eh-2",
      question: "The air quality index shows dangerous levels due to wildfire smoke. You need to go outside briefly.",
      scenario: "Hazardous Air Quality",
      options: [
        "Wet a cloth and breathe through it",
        "Wear an N95 or better mask, limit time outdoors, and take breaks in filtered indoor air",
        "Hold your breath while outside",
        "Exercise outdoors to build lung strength against smoke"
      ],
      correctAnswer: 1,
      explanation: "N95 masks filter fine particles from smoke. Wet cloths don't filter smoke particles effectively, breath-holding isn't practical, and exercise increases intake of harmful air.",
      imagePrompt: "city skyline with smoke haze, person wearing N95 mask, air quality crisis"
    },
    {
      id: "eh-3",
      question: "After heavy rain, you notice unusual colored water flowing from a nearby industrial area into a stream where children play.",
      scenario: "Industrial Runoff Contamination",
      options: [
        "Tell the children it's probably just mud and not to worry",
        "Keep everyone away from the water, document with photos, and report to environmental authorities",
        "Check if it's harmful by smelling or touching the water",
        "Assume the factory knows about it and will handle it"
      ],
      correctAnswer: 1,
      explanation: "Industrial runoff can contain toxins. Keeping people safe and reporting creates a record. Never touch or smell unknown chemicals, and assumptions allow continued pollution.",
      imagePrompt: "stream near industrial area, environmental monitoring, water safety"
    },
    {
      id: "eh-4",
      question: "You find an old battery leaking white crystite powder in your garage where you keep your food storage.",
      scenario: "Battery Acid Leak",
      options: [
        "Sweep up the powder quickly and throw it in the trash",
        "Wear protective gloves, neutralize with baking soda, clean carefully, and dispose at hazardous waste facility",
        "Wash it away with the garden hose",
        "Leave it alone since it's not causing any immediate harm"
      ],
      correctAnswer: 1,
      explanation: "Battery acid is corrosive. Proper PPE and neutralization prevent burns. Sweeping spreads contamination, water spreads the acid, and leaving it contaminates the area.",
      imagePrompt: "garage with proper hazardous material handling, safety equipment"
    },
    {
      id: "eh-5",
      question: "During a heat wave, an elderly neighbor hasn't been seen for two days. Their AC isn't running.",
      scenario: "Heat Emergency Check",
      options: [
        "Assume they went on vacation to avoid the heat",
        "Check on them immediately, call wellness check if no answer, be prepared for heat-related emergency",
        "Wait until the heat wave passes to check on them",
        "Leave a note on their door asking them to call you"
      ],
      correctAnswer: 1,
      explanation: "Heat kills, especially the elderly. Immediate check could save a life. Heat stroke can cause unconsciousness or death within hours. Waiting delays life-saving intervention.",
      imagePrompt: "residential neighborhood, wellness check, community care during heat wave"
    }
  ],
  "home-safety": [
    {
      id: "hs-1",
      question: "You wake up at night to sounds of someone trying to break into your home. They haven't entered yet.",
      scenario: "Home Break-In Attempt",
      options: [
        "Confront them at the door with a weapon",
        "Move to a safe room, call emergency services silently, prepare to defend only if necessary",
        "Turn on all lights to scare them away",
        "Yell threats through the door to make them leave"
      ],
      correctAnswer: 1,
      explanation: "Safety room and silent call prioritizes your safety. Confrontation escalates danger, lights might help but calling police is essential, and threats may provoke entry.",
      imagePrompt: "home interior at night, person calling emergency services, security"
    },
    {
      id: "hs-2",
      question: "You smell gas from your stove but can't find the leak. The pilot light is out.",
      scenario: "Stove Gas Leak",
      options: [
        "Use a lighter to relight the pilot immediately",
        "Turn off the gas supply, open windows, leave the house, and call the gas company from outside",
        "Try to smell exactly where the leak is coming from",
        "Turn on the exhaust fan to remove the gas smell"
      ],
      correctAnswer: 1,
      explanation: "Any spark (lighter, fan motor, switches) can ignite gas. Shut off source, ventilate naturally, and evacuate before calling for help.",
      imagePrompt: "kitchen stove with gas valve, person evacuating safely, home safety"
    },
    {
      id: "hs-3",
      question: "Your young child has swallowed some household cleaning liquid and seems drowsy.",
      scenario: "Poison Ingestion",
      options: [
        "Make them vomit immediately to get the poison out",
        "Call Poison Control immediately with the product information, follow their instructions",
        "Give them milk to neutralize the poison",
        "Wait to see if they get worse before calling for help"
      ],
      correctAnswer: 1,
      explanation: "Poison Control gives specific guidance based on the substance. Inducing vomiting can cause additional damage, milk doesn't neutralize most poisons, and waiting wastes critical time.",
      imagePrompt: "home with poison control number visible, parent on phone, safety"
    },
    {
      id: "hs-4",
      question: "During a power outage, you're using candles for light. One tips over and catches the curtains on fire.",
      scenario: "Candle Fire at Home",
      options: [
        "Pull down the curtains quickly to stop the fire from spreading up",
        "Get everyone out, close doors behind you, and call fire services from outside",
        "Run to get water to throw on the fire",
        "Try to smother it with a blanket"
      ],
      correctAnswer: 1,
      explanation: "Life safety first, then property. Closing doors slows fire spread. Pulling burning material is dangerous, water may not work on all fires, and blankets may catch fire.",
      imagePrompt: "home evacuation from fire, family safety, fire emergency response"
    },
    {
      id: "hs-5",
      question: "You come home to find your front door ajar. You remember locking it when you left.",
      scenario: "Possible Home Intrusion",
      options: [
        "Go inside carefully to check if anything is missing",
        "Do not enter, go to a safe location, call police and wait for them to clear the home",
        "Yell into the house to see if anyone answers",
        "Assume a family member must have come by"
      ],
      correctAnswer: 1,
      explanation: "An intruder may still be inside. Never enter a potentially compromised home. Police are trained to clear buildings safely. Entering could result in confrontation with a dangerous person.",
      imagePrompt: "house exterior with open door, person calling police, home security"
    }
  ],
  "medical-emergencies": [
    {
      id: "me-1",
      question: "A colleague collapses at work. They're not responding and don't seem to be breathing normally.",
      scenario: "Cardiac Arrest",
      options: [
        "Put them in the recovery position and wait for help",
        "Call emergency services, start CPR immediately, send someone for AED",
        "Give them water once they wake up",
        "Wait to see if they start breathing on their own"
      ],
      correctAnswer: 1,
      explanation: "CPR maintains blood flow to the brain. Every minute without CPR reduces survival by 10%. AED can restore heart rhythm. Waiting or wrong positioning wastes critical time.",
      imagePrompt: "office with CPR being performed, AED nearby, emergency response"
    },
    {
      id: "me-2",
      question: "Someone is showing signs of stroke: face drooping, arm weakness, slurred speech. It started 15 minutes ago.",
      scenario: "Stroke Symptoms",
      options: [
        "Give them aspirin to thin their blood",
        "Note the time symptoms started, call emergency services immediately, keep them calm and still",
        "Help them lie down and wait to see if symptoms improve",
        "Drive them to the hospital yourself to save time"
      ],
      correctAnswer: 1,
      explanation: "Stroke treatment is time-critical ('Time is Brain'). Ambulances can start treatment and notify hospitals. Aspirin is wrong for hemorrhagic strokes, and waiting causes brain damage.",
      imagePrompt: "person showing stroke signs, emergency call being made, FAST protocol"
    },
    {
      id: "me-3",
      question: "A diabetic friend becomes confused, sweaty, and shaky. They can still swallow.",
      scenario: "Hypoglycemia (Low Blood Sugar)",
      options: [
        "Give them their insulin injection",
        "Give them fast-acting sugar (juice, candy, glucose tablets) and stay with them",
        "Tell them to sleep it off",
        "Wait 30 minutes to see if they improve"
      ],
      correctAnswer: 1,
      explanation: "These are low blood sugar symptoms needing fast sugar. Insulin lowers blood sugar further (dangerous), sleeping is dangerous if unconscious, and waiting risks loss of consciousness.",
      imagePrompt: "person receiving glucose, diabetic emergency response, medical aid"
    },
    {
      id: "me-4",
      question: "Someone is stung by a bee and quickly develops swelling, hives, and difficulty breathing.",
      scenario: "Anaphylactic Reaction",
      options: [
        "Apply ice to reduce the swelling",
        "Help them use their epinephrine auto-injector if available, call emergency services, be ready for CPR",
        "Give them antihistamines and water",
        "Have them lie down with legs elevated"
      ],
      correctAnswer: 1,
      explanation: "Anaphylaxis is life-threatening and requires epinephrine. Antihistamines are too slow, ice doesn't stop systemic reaction, and leg elevation can worsen breathing difficulty.",
      imagePrompt: "EpiPen being administered, allergic reaction response, emergency"
    },
    {
      id: "me-5",
      question: "A person is bleeding heavily from a deep cut on their forearm. Blood is flowing steadily (not spurting).",
      scenario: "Severe Bleeding",
      options: [
        "Apply a tourniquet immediately above the wound",
        "Apply firm direct pressure with clean cloth, elevate the arm, maintain pressure until help arrives",
        "Pour alcohol on the wound to prevent infection first",
        "Let it bleed for a minute to clean out debris"
      ],
      correctAnswer: 1,
      explanation: "Direct pressure controls most bleeding. Tourniquets are for life-threatening arterial bleeding (spurting). Alcohol causes pain and cell damage, and letting it bleed causes unnecessary blood loss.",
      imagePrompt: "first aid for bleeding wound, pressure bandage, emergency care"
    }
  ],
  "electrical-hazards": [
    {
      id: "elh-1",
      question: "You see someone being electrocuted by a downed power line. They're still in contact with it.",
      scenario: "Power Line Electrocution",
      options: [
        "Quickly pull them away from the wire to save them",
        "Stay back at least 35 feet, call emergency services, do not approach until power is confirmed off",
        "Use a wooden broom to push the wire away",
        "Throw water on them to break the electrical contact"
      ],
      correctAnswer: 1,
      explanation: "High voltage can arc or travel through the ground. Only power company can safely deenergize. Touching victim, using objects, or water can electrocute rescuers.",
      imagePrompt: "downed power line scene, emergency responders, electrical safety"
    },
    {
      id: "elh-2",
      question: "You notice sparks coming from an electrical outlet in your home. Nothing is currently plugged into it.",
      scenario: "Sparking Outlet",
      options: [
        "Try plugging something in to see if the sparking continues",
        "Turn off the circuit breaker for that outlet, do not use it, and call an electrician",
        "Cover the outlet with tape to contain the sparks",
        "Pour water into the outlet to put out any potential fire"
      ],
      correctAnswer: 1,
      explanation: "Sparking indicates dangerous wiring issues. Turn off power at the breaker and get professional help. Testing it or using water creates electrocution or fire risk.",
      imagePrompt: "home electrical panel, outlet being turned off, electrician inspection"
    },
    {
      id: "elh-3",
      question: "A hair dryer falls into a bathtub full of water while someone is bathing.",
      scenario: "Electrical Appliance in Water",
      options: [
        "Quickly reach in and pull the person out",
        "Cut power at the main breaker or unplug from outlet without touching water, then help the person",
        "Throw a towel into the water for the person to grab",
        "Tell them to jump out of the tub immediately"
      ],
      correctAnswer: 1,
      explanation: "Water conducts electricity - touching it or the person can electrocute you. Cut power first, then rescue. Even standing near wet floor can be dangerous.",
      imagePrompt: "bathroom electrical safety, GFCI outlet, water hazard prevention"
    },
    {
      id: "elh-4",
      question: "During a storm, you hear a crackling sound and your hair starts to stand on end while outdoors.",
      scenario: "Imminent Lightning Strike",
      options: [
        "Lie flat on the ground to make yourself a smaller target",
        "Crouch low with feet together, on balls of feet, covering ears - never lie flat",
        "Stand under the nearest tree for shelter",
        "Keep moving quickly to get away from the area"
      ],
      correctAnswer: 1,
      explanation: "Lightning crouching position minimizes ground current exposure. Lying flat increases ground contact, trees attract strikes, and running increases exposure time.",
      imagePrompt: "person in lightning safety position, storm approaching, outdoor safety"
    },
    {
      id: "elh-5",
      question: "An electrical fire starts in your kitchen from a faulty toaster. Flames are small but growing.",
      scenario: "Electrical Fire",
      options: [
        "Unplug the toaster and throw water on it",
        "Turn off power if safe, use CO2 or dry chemical fire extinguisher, never use water on electrical fires",
        "Cover it with a wet towel to smother the flames",
        "Fan the flames with a dish towel to scatter them"
      ],
      correctAnswer: 1,
      explanation: "Water conducts electricity and can spread electrical fires. Cut power if safe, use appropriate extinguisher (Class C). Wet materials and fanning increase danger.",
      imagePrompt: "kitchen with fire extinguisher, electrical fire safety, home protection"
    }
  ]
};
