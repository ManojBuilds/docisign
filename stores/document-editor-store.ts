import { create } from "zustand";
import { SignatureFieldData } from "@/components/signature-field";
import { Id } from "@/convex/_generated/dataModel";

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

  signers: Signer[];
  setSigners: (signers: Signer[]) => void;

  selectedTool: SignatureFieldData["fieldType"] | "selection";
  setSelectedTool: (tool: SignatureFieldData["fieldType"] | "selection") => void;
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
          signers: [],
          selectedTool: "selection",
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
      set((state) => ({
        signatureFields: state.signatureFields.map((f) =>
          f.id === field.id ? field : f,
        ),
      })),
    deleteSignatureFieldInStore: (id) =>
      set((state) => ({
        signatureFields: state.signatureFields.filter((f) => f.id !== id),
      })),

    selectedFieldId: "",
    setSelectedFieldId: (id) => set({ selectedFieldId: id }),

    currentPage: 1,
    setCurrentPage: (page) => set({ currentPage: page }),

    signers: [],
    setSigners: (signers) => set({ signers }),

    selectedTool: "selection",
    setSelectedTool: (tool) => set({ selectedTool: tool }),
  })
);