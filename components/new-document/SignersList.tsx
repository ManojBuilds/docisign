"use client";

import { FC, memo } from 'react';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useSignersStore } from '@/stores/signersStore';

interface SignersListProps {
    isUploading: boolean;
}

export const SignersList: FC<SignersListProps> = memo(({ isUploading }) => {
    const { signers, removeSigner } = useSignersStore();

    if (signers.length === 0) {
        return null;
    }

    return (
        <div className="flex flex-wrap gap-2 pt-1">
            {signers.map((signer, index) => (
                <div
                    key={index}
                    className="flex items-center gap-2 bg-white border border-gray-100 pl-1.5 pr-3 py-1.5 rounded-full shadow-sm"
                >
                    <div className={cn(
                        "w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-semibold text-white shadow-sm",
                        index % 5 === 0 ? 'bg-indigo-500' :
                            index % 5 === 1 ? 'bg-rose-500' :
                                index % 5 === 2 ? 'bg-emerald-500' :
                                    index % 5 === 3 ? 'bg-amber-500' :
                                        'bg-sky-500'
                    )}>
                        {signer.email.charAt(0).toUpperCase()}
                    </div>
                    <span className="text-[13px] font-semibold text-gray-700">{signer.email}</span>
                    <button
                        type="button"
                        onClick={() => removeSigner(signer.email)}
                        disabled={isUploading}
                        className="ml-1 text-gray-400 hover:text-red-500 transition-colors"
                    >
                        <X className="w-3.5 h-3.5" />
                    </button>
                </div>
            ))}
        </div>
    );
});

SignersList.displayName = 'SignersList';
