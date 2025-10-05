import { useState } from 'react';
import { Book, CheckCircle, XCircle, Award, ArrowRight } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';

interface EducationalModeProps {
  onNavigate: (view: string) => void;
}

const educationalContent = [
  {
    id: 'detection',
    title: 'Asteroid Detection',
    content: `Near-Earth asteroids are detected using a combination of ground-based telescopes and space-based observatories. NASA's Catalina Sky Survey, Pan-STARRS, and the NEOWISE mission are among the primary detection systems.

Once detected, asteroids are tracked to determine their orbits and assess potential collision risks. The Torino Scale and Palermo Technical Impact Hazard Scale are used to categorize impact threats.

Over 30,000 near-Earth asteroids have been discovered, with new ones found every week. The goal is to detect 90% of asteroids larger than 140 meters.`,
    imageUrl: 'https://images.unsplash.com/photo-1727034393564-dc7b0275686d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWxlc2NvcGUlMjBvYnNlcnZhdG9yeSUyMG5pZ2h0fGVufDF8fHx8MTc1OTY0Mjk5MHww&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 'types',
    title: 'Types of Asteroids',
    content: `Asteroids are classified into three main types:

• C-type (Carbonaceous): Dark asteroids rich in carbon, making up about 75% of known asteroids.

• S-type (Silicaceous): Bright asteroids composed of silicate materials and nickel-iron, comprising about 17% of asteroids.

• M-type (Metallic): Metallic asteroids primarily composed of iron and nickel.

Near-Earth asteroids are further classified by their orbits as Atens, Apollos, or Amors, based on their relationship to Earth's orbit.`,
    imageUrl: 'https://images.unsplash.com/photo-1638716000957-e0e0e32817b2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhc3Rlcm9pZCUyMHNwYWNlJTIwcm9ja3xlbnwxfHx8fDE3NTk2NDI5OTN8MA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 'impact',
    title: 'Impact Physics',
    content: `When an asteroid impacts Earth, it releases enormous amounts of kinetic energy. The impact creates:

• A crater many times larger than the asteroid itself
• A blast wave that can level structures over vast areas
• Seismic waves equivalent to major earthquakes
• Thermal radiation that can ignite fires
• Atmospheric effects including dust and debris

The Chicxulub impact 66 million years ago, which contributed to dinosaur extinction, released energy equivalent to 100 million megatons of TNT.`,
    imageUrl: 'https://images.unsplash.com/photo-1722311321554-0e05a8311fb3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZXRlb3IlMjBpbXBhY3QlMjBleHBsb3Npb258ZW58MXx8fHwxNzU5NjQyOTk2fDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 'defense',
    title: 'Planetary Defense',
    content: `Multiple strategies exist for deflecting dangerous asteroids:

• Kinetic Impact: Crashing a spacecraft into the asteroid (NASA DART mission proved this in 2022)

• Nuclear Deflection: Using a nuclear explosion to vaporize material and create thrust

• Gravity Tractor: Using a spacecraft's gravity to slowly pull the asteroid off course

• Ion Beam Shepherd: Using focused ion beams to gradually change trajectory

The key to all methods is early detection - the earlier we detect a threat, the easier it is to deflect.`,
    imageUrl: 'https://images.unsplash.com/photo-1712512161505-9bb35eae9e0b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcGFjZWNyYWZ0JTIwc2F0ZWxsaXRlJTIwbWlzc2lvbnxlbnwxfHx8fDE3NTk2NDI5OTh8MA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 'history',
    title: 'Historical Impacts',
    content: `Earth has experienced many asteroid impacts throughout history:

• 2013 Chelyabinsk meteor: 20m asteroid exploded over Russia, injuring 1,500 people with shockwave

• 1908 Tunguska event: 50-60m asteroid exploded over Siberia, flattening 2,000 km² of forest

• 50,000 years ago: Barringer Crater in Arizona created by 50m asteroid

• 66 million years ago: Chicxulub impact, 10km asteroid, mass extinction event

Smaller impacts occur more frequently, with house-sized asteroids entering Earth's atmosphere about once per year.`,
    imageUrl: 'https://images.unsplash.com/photo-1727088722105-6a998751d475?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZXRlb3IlMjBjcmF0ZXIlMjBhcml6b25hfGVufDF8fHx8MTc1OTY0MzAwMXww&ixlib=rb-4.1.0&q=80&w=1080',
  },
];

const quizQuestions = [
  {
    question: 'Approximately how many near-Earth asteroids have been discovered?',
    options: ['5,000', '15,000', '30,000', '50,000'],
    correct: 2,
    explanation: 'Over 30,000 near-Earth asteroids have been discovered, with new ones found every week.',
  },
  {
    question: 'Which mission successfully demonstrated the kinetic impact deflection technique?',
    options: ['NASA DART', 'ESA Rosetta', 'JAXA Hayabusa', 'NASA OSIRIS-REx'],
    correct: 0,
    explanation: 'NASA\'s DART mission successfully impacted the asteroid Dimorphos in 2022, changing its orbit.',
  },
  {
    question: 'What caused the Tunguska event in 1908?',
    options: ['Volcanic eruption', 'Earthquake', 'Asteroid explosion', 'Nuclear test'],
    correct: 2,
    explanation: 'A 50-60 meter asteroid exploded over Siberia, flattening 2,000 km² of forest.',
  },
  {
    question: 'What is the primary advantage of early asteroid detection?',
    options: ['Better photos', 'Easier deflection', 'More time to panic', 'Scientific research'],
    correct: 1,
    explanation: 'Early detection makes deflection much easier, as smaller trajectory changes are needed with more time.',
  },
  {
    question: 'Which asteroid type is most common?',
    options: ['M-type (Metallic)', 'S-type (Silicaceous)', 'C-type (Carbonaceous)', 'X-type'],
    correct: 2,
    explanation: 'C-type (Carbonaceous) asteroids make up about 75% of known asteroids.',
  },
];

export function EducationalMode({ onNavigate }: EducationalModeProps) {
  const [selectedTopic, setSelectedTopic] = useState(educationalContent[0]);
  const [quizMode, setQuizMode] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);

  const handleAnswerSelect = (index: number) => {
    setSelectedAnswer(index);
    setShowExplanation(true);
    
    if (index === quizQuestions[currentQuestion].correct) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      setQuizComplete(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setScore(0);
    setQuizComplete(false);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white p-4 md:p-6">
      {/* Header */}
      <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2 md:gap-4">
          <Button variant="outline" onClick={() => onNavigate('dashboard')}>
            ← Back
          </Button>
          <div className="flex items-center gap-2 md:gap-3">
            <Book className="w-6 h-6 md:w-8 md:h-8 text-blue-400" />
            <h1 className="text-xl md:text-3xl">Educational Center</h1>
          </div>
        </div>
        <Button 
          variant="outline"
          onClick={() => setQuizMode(!quizMode)}
        >
          {quizMode ? 'Back to Learning' : 'Take Quiz'}
        </Button>
      </div>

      {!quizMode ? (
        /* Learning Mode */
        <div className="grid lg:grid-cols-4 gap-6">
          {/* Topic List */}
          <div className="lg:col-span-1 space-y-3">
            <h3 className="mb-4">Topics</h3>
            {educationalContent.map((topic) => (
              <Card
                key={topic.id}
                onClick={() => setSelectedTopic(topic)}
                className={`cursor-pointer transition-all p-4 ${
                  selectedTopic.id === topic.id
                    ? 'bg-blue-900/50 border-blue-500'
                    : 'bg-slate-900 border-slate-800 hover:border-slate-700'
                }`}
              >
                <h4>{topic.title}</h4>
              </Card>
            ))}
          </div>

          {/* Content Display */}
          <div className="lg:col-span-3">
            <Card className="bg-slate-900 border-slate-800 p-6">
              <h2 className="mb-4">{selectedTopic.title}</h2>
              
              {/* Image */}
              <div className="bg-slate-800 rounded-lg h-64 mb-6 flex items-center justify-center overflow-hidden">
                <img 
                  src={selectedTopic.imageUrl}
                  alt={selectedTopic.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>

              <div className="prose prose-invert max-w-none">
                {selectedTopic.content.split('\n\n').map((paragraph, index) => (
                  <p key={index} className="mb-4 text-slate-300 leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>

              <div className="mt-6 flex justify-between">
                <Button
                  variant="outline"
                  onClick={() => {
                    const currentIndex = educationalContent.findIndex(t => t.id === selectedTopic.id);
                    if (currentIndex > 0) {
                      setSelectedTopic(educationalContent[currentIndex - 1]);
                    }
                  }}
                  disabled={educationalContent.findIndex(t => t.id === selectedTopic.id) === 0}
                >
                  Previous Topic
                </Button>
                <Button
                  onClick={() => {
                    const currentIndex = educationalContent.findIndex(t => t.id === selectedTopic.id);
                    if (currentIndex < educationalContent.length - 1) {
                      setSelectedTopic(educationalContent[currentIndex + 1]);
                    }
                  }}
                  disabled={educationalContent.findIndex(t => t.id === selectedTopic.id) === educationalContent.length - 1}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  Next Topic
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </Card>

            {/* Quick Facts */}
            <Card className="bg-slate-900 border-slate-800 p-6 mt-6">
              <h3 className="mb-4">Quick Facts</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-slate-800 rounded-lg p-4">
                  <p className="text-slate-400 text-sm mb-1">NASA Budget (2024)</p>
                  <p className="text-xl">$184M for planetary defense</p>
                </div>
                <div className="bg-slate-800 rounded-lg p-4">
                  <p className="text-slate-400 text-sm mb-1">Impact Frequency</p>
                  <p className="text-xl">City-killer every ~1000 years</p>
                </div>
                <div className="bg-slate-800 rounded-lg p-4">
                  <p className="text-slate-400 text-sm mb-1">Next Known Close Approach</p>
                  <p className="text-xl">Apophis in 2029</p>
                </div>
                <div className="bg-slate-800 rounded-lg p-4">
                  <p className="text-slate-400 text-sm mb-1">Detection Goal</p>
                  <p className="text-xl">90% of 140m+ asteroids</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      ) : (
        /* Quiz Mode */
        <div className="max-w-3xl mx-auto">
          {!quizComplete ? (
            <Card className="bg-slate-900 border-slate-800 p-8">
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="outline">Question {currentQuestion + 1} of {quizQuestions.length}</Badge>
                  <Badge className="bg-blue-600">Score: {score}/{quizQuestions.length}</Badge>
                </div>
                <Progress value={(currentQuestion / quizQuestions.length) * 100} className="h-2" />
              </div>

              <h2 className="mb-6">{quizQuestions[currentQuestion].question}</h2>

              <div className="space-y-3 mb-6">
                {quizQuestions[currentQuestion].options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswerSelect(index)}
                    disabled={selectedAnswer !== null}
                    className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                      selectedAnswer === null
                        ? 'bg-slate-800 border-slate-700 hover:border-blue-500'
                        : selectedAnswer === index
                        ? index === quizQuestions[currentQuestion].correct
                          ? 'bg-green-900/30 border-green-500'
                          : 'bg-red-900/30 border-red-500'
                        : index === quizQuestions[currentQuestion].correct
                        ? 'bg-green-900/30 border-green-500'
                        : 'bg-slate-800 border-slate-700 opacity-50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span>{option}</span>
                      {selectedAnswer !== null && (
                        <>
                          {index === quizQuestions[currentQuestion].correct && (
                            <CheckCircle className="w-5 h-5 text-green-400" />
                          )}
                          {selectedAnswer === index && index !== quizQuestions[currentQuestion].correct && (
                            <XCircle className="w-5 h-5 text-red-400" />
                          )}
                        </>
                      )}
                    </div>
                  </button>
                ))}
              </div>

              {showExplanation && (
                <div className="bg-blue-900/30 border border-blue-700 rounded-lg p-4 mb-6">
                  <p className="text-blue-200">{quizQuestions[currentQuestion].explanation}</p>
                </div>
              )}

              {selectedAnswer !== null && (
                <Button 
                  onClick={handleNextQuestion}
                  className="w-full bg-blue-600 hover:bg-blue-700"
                >
                  {currentQuestion < quizQuestions.length - 1 ? 'Next Question' : 'Finish Quiz'}
                </Button>
              )}
            </Card>
          ) : (
            /* Quiz Complete */
            <Card className="bg-slate-900 border-slate-800 p-8 text-center">
              <Award className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
              <h2 className="mb-4">Quiz Complete!</h2>
              <p className="text-3xl mb-2">{score} / {quizQuestions.length}</p>
              <p className="text-slate-400 mb-6">
                {score === quizQuestions.length
                  ? 'Perfect score! You are a planetary defense expert!'
                  : score >= quizQuestions.length * 0.7
                  ? 'Great job! You have a solid understanding of asteroid threats.'
                  : score >= quizQuestions.length * 0.5
                  ? 'Good effort! Review the educational content to learn more.'
                  : 'Keep learning! Review the topics and try again.'}
              </p>
              <div className="flex gap-4 justify-center">
                <Button onClick={resetQuiz} variant="outline">
                  Retake Quiz
                </Button>
                <Button onClick={() => setQuizMode(false)} className="bg-blue-600 hover:bg-blue-700">
                  Back to Learning
                </Button>
              </div>
            </Card>
          )}
        </div>
      )}
    </div>
  );
}