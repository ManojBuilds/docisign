import { Suspense } from 'react';
import UpgradeSuccessContent from './UpgradeSuccessContent';

export default function UpgradeSuccessPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <UpgradeSuccessContent />
    </Suspense>
  );
}
