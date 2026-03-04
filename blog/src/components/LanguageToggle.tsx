import { Globe } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';
import { Button } from '@/components/ui/button';
import { clsx } from 'clsx';

export default function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'zh' ? 'en' : 'zh');
  };

  return (
    <Button
      variant="link"
      className={clsx("text-sm font-normal", "sm:text-base")}
      onClick={toggleLanguage}
    >
      <Globe className="h-4 w-4 mr-1" />
      {language === 'zh' ? 'EN' : '中文'}
    </Button>
  );
}
