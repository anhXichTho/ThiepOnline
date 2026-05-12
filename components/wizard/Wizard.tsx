'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import type { CardContent, CardType } from '@/lib/firestore';
import StepChooseType from './StepChooseType';
import StepChooseTemplate from './StepChooseTemplate';
import StepEditContent from './StepEditContent';
import StepShare from './StepShare';
import { X } from 'lucide-react';

interface Props {
  initialType?: CardType;
  ownerName?: string;
  onClose?: () => void;
}

const EMPTY: CardContent = {
  title: '',
  hostName: '',
  eventDate: '',
  eventTime: '19:00',
  location: '',
  message: '',
  members: [],
};

export default function Wizard({ initialType, ownerName, onClose }: Props) {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(initialType ? 2 : 1);
  const [type, setType] = useState<CardType | undefined>(initialType);
  const [templateId, setTemplateId] = useState<string | undefined>();
  const [content, setContent] = useState<CardContent>(EMPTY);
  const [imageUrl, setImageUrl] = useState<string>('');
  const [galleryUrls, setGalleryUrls] = useState<string[]>([]);

  return (
    <div className="relative">
      {onClose && (
        <button
          onClick={onClose}
          className="absolute -top-2 -right-2 z-20 w-9 h-9 rounded-full bg-white shadow-md flex items-center justify-center text-gray-600"
          aria-label="Đóng"
        >
          <X className="w-5 h-5" />
        </button>
      )}

      {/* Progress */}
      <div className="mb-4 flex gap-1">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className={`h-1.5 flex-1 rounded-full transition-colors ${
              i <= step ? 'bg-yearbook-gold' : 'bg-gray-200'
            }`}
          />
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.25 }}
        >
          {step === 1 && (
            <StepChooseType
              selected={type}
              onSelect={(t) => {
                setType(t);
                setTemplateId(undefined);
                setStep(2);
              }}
            />
          )}

          {step === 2 && type && (
            <StepChooseTemplate
              type={type}
              selected={templateId}
              onSelect={setTemplateId}
              onBack={() => setStep(1)}
              onNext={() => setStep(3)}
            />
          )}

          {step === 3 && type && templateId && (
            <StepEditContent
              type={type}
              content={content}
              imageUrl={imageUrl}
              galleryUrls={galleryUrls}
              onChange={setContent}
              onImageUrl={setImageUrl}
              onGalleryUrls={setGalleryUrls}
              onBack={() => setStep(2)}
              onNext={() => setStep(4)}
            />
          )}

          {step === 4 && type && templateId && (
            <StepShare
              type={type}
              templateId={templateId}
              content={content}
              imageUrl={imageUrl}
              galleryUrls={galleryUrls}
              ownerName={ownerName}
              onBack={() => setStep(3)}
            />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
