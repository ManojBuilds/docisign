"use client";

import { FC, Dispatch, SetStateAction, memo } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

interface RecipientFormProps {
    currentEmail: string;
    setCurrentEmail: Dispatch<SetStateAction<string>>;
    handleAddEmail: () => void;
    isUploading: boolean;
}

export const RecipientForm: FC<RecipientFormProps> = memo(({
    currentEmail,
    setCurrentEmail,
    handleAddEmail,
    isUploading
}) => {
    return (
        <div className="space-y-4">
            <div className="flex flex-col gap-1 ml-1">
                <Label className="text-[13px] font-semibold text-gray-900 uppercase tracking-wider">Recipients</Label>
                <p className="text-[13px] text-gray-500">Who needs to sign this document?</p>
            </div>

            <div className="flex gap-2 p-1.5 bg-gray-50 rounded-xl border border-gray-100 focus-within:border-blue-200 focus-within:bg-white transition-colors duration-150">
                <Input
                    type="email"
                    placeholder="Enter email address"
                    value={currentEmail}
                    onChange={(e) => setCurrentEmail(e.target.value)}
                    onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                            e.preventDefault();
                            handleAddEmail();
                        }
                    }}
                    className="border-none bg-transparent shadow-none focus-visible:ring-0 h-10"
                    disabled={isUploading}
                />
                <Button
                    type="button"
                    onClick={handleAddEmail}
                    size="sm"
                    disabled={isUploading || !currentEmail.trim()}
                    className="rounded-lg px-4 bg-gray-900 hover:bg-black text-white"
                >
                    Add
                </Button>
            </div>
        </div>
    );
});

RecipientForm.displayName = 'RecipientForm';
