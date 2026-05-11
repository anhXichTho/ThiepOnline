import YearbookTemplate from './YearbookTemplate';
import WeddingTemplate from './WeddingTemplate';
import BirthdayTemplate from './BirthdayTemplate';
import type { CardType } from '@/lib/firestore';
import type { TemplateProps } from './types';
import React from 'react';

export { YearbookTemplate, WeddingTemplate, BirthdayTemplate };

export function renderTemplate(type: CardType, templateId: string, props: Omit<TemplateProps, 'content'> & { content: TemplateProps['content'] }) {
  const contentWithTemplate = { ...props.content, __templateId: templateId } as any;
  const merged = { ...props, content: contentWithTemplate };
  switch (type) {
    case 'yearbook':
      return React.createElement(YearbookTemplate, merged);
    case 'wedding':
      return React.createElement(WeddingTemplate, merged);
    case 'birthday':
      return React.createElement(BirthdayTemplate, merged);
  }
}
