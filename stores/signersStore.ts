import { create } from 'zustand';

interface Signer {
  email: string;
  name?: string;
}

interface SignersState {
  signers: Signer[];
  addSigner: (signer: Signer) => void;
  removeSigner: (email: string) => void;
  updateSigner: (email: string, updates: Partial<Signer>) => void;
  setSigners: (signers: Signer[]) => void;
  clearSigners: () => void;
  addEmail: (email: string) => void; // For compatibility with NewDocumentDialog
  removeEmail: (email: string) => void; // For compatibility with NewDocumentDialog
}

export const useSignersStore = create<SignersState>((set, get) => ({
  signers: [],
  
  addSigner: (signer) => 
    set((state) => {
      // Avoid duplicates
      if (state.signers.some(s => s.email === signer.email)) {
        return state;
      }
      return { signers: [...state.signers, signer] };
    }),
  
  removeSigner: (email) => 
    set((state) => ({
      signers: state.signers.filter(signer => signer.email !== email)
    })),
  
  updateSigner: (email, updates) => 
    set((state) => ({
      signers: state.signers.map(signer =>
        signer.email === email ? { ...signer, ...updates } : signer
      )
    })),
  
  setSigners: (signers) => 
    set({ signers }),
  
  clearSigners: () => 
    set({ signers: [] }),
  
  // Helper methods for compatibility with NewDocumentDialog
  addEmail: (email) => {
    if (!get().signers.some(s => s.email === email)) {
      get().addSigner({ email });
    }
  },
  
  removeEmail: (email) => {
    get().removeSigner(email);
  },
}));