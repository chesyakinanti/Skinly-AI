import assert from 'node:assert';
import {
  generateSpeechScript,
  generateSpeechText,
  selectIndonesianFemaleVoice,
  speechService,
} from '../src/services/speechService';
import { ClassificationResult, BoundingBox } from '../src/types';

function runTests() {
  console.log('Running tests for speechService strict female Indonesian voice selection...\n');

  // Test 1: Dry Skin Script Generation
  const dryClassification: ClassificationResult = {
    predictedType: 'Dry',
    confidence: 88,
    probabilities: [
      { type: 'Dry', percentage: 88, color: '#A9BDCC' },
      { type: 'Normal', percentage: 7, color: '#A9B8A2' },
      { type: 'Oily', percentage: 3, color: '#A4556B' },
      { type: 'Combination', percentage: 2, color: '#8F475B' },
    ],
    educationalNotes: 'Dry skin notes',
  };

  const dryBoxes: BoundingBox[] = [
    { x: 0.2, y: 0.3, width: 0.2, height: 0.2, label: 'dry_region', confidence: 91 },
  ];

  const dryScript = generateSpeechScript(dryClassification, dryBoxes, 'id');
  console.log('[Dry Skin Spoken Script]:', dryScript.spokenText);
  assert(dryScript.spokenText.includes('kering'), 'Should mention dry skin (kering)');
  assert(dryScript.spokenText.includes('Hyaluronic Acid'), 'Should suggest Hyaluronic Acid');
  assert(dryScript.spokenText.includes('Ceramide'), 'Should suggest Ceramide');
  assert(dryScript.spokenText.includes('Glycerin'), 'Should suggest Glycerin');
  assert(dryScript.spokenText.includes('zona kering'), 'Should mention detected dry zones from YOLO');

  // Test 2: Oily Skin Script Generation
  const oilyClassification: ClassificationResult = {
    predictedType: 'Oily',
    confidence: 92,
    probabilities: [
      { type: 'Oily', percentage: 92, color: '#A4556B' },
      { type: 'Combination', percentage: 5, color: '#8F475B' },
      { type: 'Normal', percentage: 2, color: '#A9B8A2' },
      { type: 'Dry', percentage: 1, color: '#9BB5C4' },
    ],
    educationalNotes: 'Oily skin notes',
  };

  const oilyBoxes: BoundingBox[] = [
    { x: 0.4, y: 0.2, width: 0.2, height: 0.2, label: 'oily_region', confidence: 85 },
  ];

  const oilyScript = generateSpeechScript(oilyClassification, oilyBoxes, 'id');
  console.log('\n[Oily Skin Spoken Script]:', oilyScript.spokenText);
  assert(oilyScript.spokenText.includes('berminyak'), 'Should mention oily skin (berminyak)');
  assert(oilyScript.spokenText.includes('Niacinamide'), 'Should suggest Niacinamide');
  assert(oilyScript.spokenText.includes('Salicylic Acid'), 'Should suggest Salicylic Acid');
  assert(oilyScript.spokenText.includes('zona berminyak'), 'Should mention detected oily zones from YOLO');

  // Test 3: Normal Skin
  const normalClassification: ClassificationResult = {
    predictedType: 'Normal',
    confidence: 90,
    probabilities: [
      { type: 'Normal', percentage: 90, color: '#A9B8A2' },
      { type: 'Combination', percentage: 5, color: '#8F475B' },
      { type: 'Dry', percentage: 3, color: '#9BB5C4' },
      { type: 'Oily', percentage: 2, color: '#A4556B' },
    ],
    educationalNotes: 'Normal skin notes',
  };

  const normalText = generateSpeechText(normalClassification, [], 'id');
  console.log('\n[Normal Skin Display Text]:', normalText);
  assert(normalText.includes('normal'), 'Should mention normal skin');
  assert(normalText.includes('Hyaluronic Acid'), 'Should suggest Hyaluronic Acid');

  // Test 4: Voice Selection Hierarchy Tests
  console.log('\nRunning Strict Female Indonesian Voice Selection Tests...');

  // Case A: Microsoft Gadis Available -> Must Select Gadis (Female)
  const mockVoicesGadis = [
    { name: 'Microsoft Andika', lang: 'id-ID', default: false, localService: true, voiceURI: 'andika' },
    { name: 'Microsoft Gadis Online (Natural) - Indonesian (Indonesia)', lang: 'id-ID', default: false, localService: false, voiceURI: 'gadis' },
    { name: 'Microsoft Zira - English (United States)', lang: 'en-US', default: false, localService: true, voiceURI: 'zira' },
  ] as unknown as SpeechSynthesisVoice[];

  const chosenGadis = selectIndonesianFemaleVoice(mockVoicesGadis, 'id-ID');
  console.log('Case A (Gadis + Andika + Zira) -> Chosen:', chosenGadis?.name);
  assert(chosenGadis?.name.includes('Gadis'), 'Must pick Gadis (Indonesian female)');

  // Case B: Google Bahasa Indonesia Available -> Must Select Google Bahasa Indonesia
  const mockVoicesGoogle = [
    { name: 'Microsoft Andika', lang: 'id-ID', default: false, localService: true, voiceURI: 'andika' },
    { name: 'Google Bahasa Indonesia', lang: 'id-ID', default: false, localService: false, voiceURI: 'google' },
    { name: 'Microsoft Zira', lang: 'en-US', default: false, localService: true, voiceURI: 'zira' },
  ] as unknown as SpeechSynthesisVoice[];

  const chosenGoogle = selectIndonesianFemaleVoice(mockVoicesGoogle, 'id-ID');
  console.log('Case B (Google Bahasa Indonesia + Andika + Zira) -> Chosen:', chosenGoogle?.name);
  assert(chosenGoogle?.name.includes('Google Bahasa Indonesia'), 'Must pick Google Bahasa Indonesia');

  // Case C: ONLY Microsoft Andika (Male) is present on OS
  // STRICT RULE: Must NEVER secretly select Microsoft Andika (male). Must return null.
  const mockVoicesOnlyMaleIndonesian = [
    { name: 'Microsoft Andika', lang: 'id-ID', default: false, localService: true, voiceURI: 'andika' },
    { name: 'Microsoft David', lang: 'en-US', default: false, localService: true, voiceURI: 'david' },
  ] as unknown as SpeechSynthesisVoice[];

  const chosenRejectMale = selectIndonesianFemaleVoice(mockVoicesOnlyMaleIndonesian, 'id-ID');
  console.log('Case C (Only Andika(male) + David(male)) -> Chosen:', chosenRejectMale);
  assert(chosenRejectMale === null, 'Must reject Microsoft Andika and never return a male voice');

  // Case D: NO Indonesian voices on OS/browser at all
  const mockVoicesOnlyEnglish = [
    { name: 'Microsoft David', lang: 'en-US', default: false, localService: true, voiceURI: 'david' },
    { name: 'Microsoft Zira - English (United States)', lang: 'en-US', default: false, localService: true, voiceURI: 'zira' },
  ] as unknown as SpeechSynthesisVoice[];

  const chosenFallback = selectIndonesianFemaleVoice(mockVoicesOnlyEnglish, 'id-ID');
  console.log('Case D (Only English voices on OS) -> Chosen:', chosenFallback);
  assert(chosenFallback === null, 'Must return null for Indonesian voice when no id-ID voice is available, not forcing an English voice');

  console.log('\nAll speechService tests passed successfully!');
}

runTests();
