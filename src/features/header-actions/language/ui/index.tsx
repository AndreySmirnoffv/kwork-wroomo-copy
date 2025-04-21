'use client';

import { ChangeEvent, useId, useState } from 'react';
import { LanguageContainerStyle, LanguageLabelStyle, ListStyle } from './style';
import { languageList } from '../model';

export const Language = () => {
  const [selectedLang, setSelectedLang] = useState('RU');
  const [isActive, setIsActive] = useState(false);
  const id = useId();

  const toggleSelected = (selected: string) => {
    setSelectedLang(selected);
    setIsActive(false);
  };

  const handleCheckbox = (e: ChangeEvent<HTMLInputElement>) => {
    setIsActive(e.target.checked);
  };

  return (
    <LanguageContainerStyle>
      <LanguageLabelStyle htmlFor={id}>
        <input type='checkbox' checked={isActive} id={id} onChange={handleCheckbox} />
        {selectedLang}
      </LanguageLabelStyle>
      <ListStyle isActive={isActive}>
        {languageList.map(
          item =>
            item.text !== selectedLang && (
              <li onClick={() => toggleSelected(item.text)} key={item.id}>
                {item.text}
              </li>
            )
        )}
      </ListStyle>
    </LanguageContainerStyle>
  );
};
