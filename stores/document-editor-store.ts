import { SignatureFieldData } from "@/components/signature-field";
import { Id } from "@/convex/_generated/dataModel";
import { create } from "zustand";

interface Signer {
  email: string;
  name?: string;
}

interface DocumentEditorState {
  documentId: Id<"documents"> | null;
  setDocumentId: (id: Id<"documents">) => void;

  signatureFields: SignatureFieldData[];
  setSignatureFields: (fields: SignatureFieldData[]) => void;
  addSignatureField: (field: SignatureFieldData) => void;
  updateSignatureFieldInStore: (field: SignatureFieldData) => void;
  deleteSignatureFieldInStore: (id: string) => void;

  selectedFieldId: string;
  setSelectedFieldId: (id: string) => void;

  currentPage: number;
  setCurrentPage: (page: number) => void;

  manualSigners: Signer[];
  setManualSigners: (signers: Signer[]) => void;
  addManualSigner: (signer: Signer) => void;
  removeManualSigner: (email: string) => void;

  selectedTool: SignatureFieldData["fieldType"] | "selection";
  setSelectedTool: (tool: SignatureFieldData["fieldType"] | "selection") => void;

  isLoaded: boolean;
  setIsLoaded: (isLoaded: boolean) => void;
  lastSavedFieldsJson: string;
  setLastSavedFieldsJson: (json: string) => void;

  lastAssignedSignerEmail: string | null;
  setLastAssignedSignerEmail: (email: string | null) => void;
}

export const useDocumentEditorStore = create<DocumentEditorState>()(
  (set, get) => ({
    documentId: null,
    setDocumentId: (id) => {
      if (get().documentId !== id) {
        // New document, reset the state
        set({
          documentId: id,
          signatureFields: [],
          selectedFieldId: "",
          currentPage: 1,
          manualSigners: [],
          selectedTool: "selection",
          isLoaded: false,
          lastSavedFieldsJson: "[]",
          lastAssignedSignerEmail: null,
        });
      }
    },

    signatureFields: [],
    setSignatureFields: (fields) => {
      // Deduplicate fields based on unique properties to prevent duplicates from multiple load/save cycles
      const seen = new Set();
      const uniqueFields = fields.filter((f) => {
        // Create a unique key for the field based on its visible properties
        // We use toFixed(4) for coordinates to handle minor floating point differences
        const key = `${f.fieldType}-${f.page}-${f.signerEmail || 'unassigned'}-${f.normalizedX.toFixed(4)}-${f.normalizedY.toFixed(4)}`;
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      });

      if (JSON.stringify(get().signatureFields) !== JSON.stringify(uniqueFields)) {
        set({ signatureFields: uniqueFields });
      }
    },
    addSignatureField: (field) =>
      set((state) => {
        const key = (f: SignatureFieldData) => `${f.fieldType}-${f.page}-${f.signerEmail || 'unassigned'}-${f.normalizedX.toFixed(4)}-${f.normalizedY.toFixed(4)}`;
        const newKey = key(field);
        const alreadyExists = state.signatureFields.some(f => key(f) === newKey);

        if (alreadyExists) return state;
        return { signatureFields: [...state.signatureFields, field] };
      }),
    updateSignatureFieldInStore: (field) =>
      set((state) => {
        // Check if signer changed to update the lastAssignedSignerEmail
        const existingField = state.signatureFields.find(f => f.id === field.id);
        let changes: Partial<DocumentEditorState> = {
          signatureFields: state.signatureFields.map((f) =>
            f.id === field.id ? field : f,
          ),
        };

        if (existingField && field.signerEmail && existingField.signerEmail !== field.signerEmail) {
          changes.lastAssignedSignerEmail = field.signerEmail;
        }

        return changes;
      }),
    deleteSignatureFieldInStore: (id) =>
      set((state) => ({
        signatureFields: state.signatureFields.filter((f) => f.id !== id),
      })),

    selectedFieldId: "",
    setSelectedFieldId: (id) => set({ selectedFieldId: id }),

    currentPage: 1,
    setCurrentPage: (page) => set({ currentPage: page }),

    manualSigners: [],
    setManualSigners: (manualSigners) => set({ manualSigners }),
    addManualSigner: (signer) => set((state) => {
      if (state.manualSigners.some(s => s.email === signer.email)) return state;
      return { manualSigners: [...state.manualSigners, signer] };
    }),
    removeManualSigner: (email) => set((state) => ({
      manualSigners: state.manualSigners.filter(s => s.email !== email)
    })),

    selectedTool: "selection",
    setSelectedTool: (tool) => set({ selectedTool: tool }),

    isLoaded: false,
    setIsLoaded: (isLoaded) => set({ isLoaded }),
    lastSavedFieldsJson: "[]",
    setLastSavedFieldsJson: (lastSavedFieldsJson) => set({ lastSavedFieldsJson }),

    lastAssignedSignerEmail: null,
    setLastAssignedSignerEmail: (email) => set({ lastAssignedSignerEmail: email }),
  })
);