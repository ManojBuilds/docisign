'use client';

import React from 'react';
import { useUser } from '@clerk/nextjs';
import { useDocumentEditorStore } from '@/store/document-editor-store';
import { Button } from './ui/button';
import { Plus, Trash2, User, Settings, UserPlus } from 'lucide-react';
import { Separator } from './ui/separator';
import { cn } from '@/lib/utils';
import { Id } from '@/convex/_generated/dataModel';
import { useMutation, useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { SignatureFieldData } from './signature-field';
import { SignatureFieldSettings } from './signature-field-settings';
import { Input } from './ui/input';
import { toast } from 'sonner';

interface Signer {
  email: string;
  name?: string;
}

interface UserSigner {
  email: string;
  name?: string;
  documentId: Id<"documents">;
  documentTitle: string;
}

interface SignersSidebarProps {
  documentId: Id<"documents">;
}

const gradients = [
  'from-pink-500 to-yellow-500',
  'from-purple-500 to-indigo-500',
  'from-green-400 to-blue-500',
  'from-red-500 to-orange-500',
  'from-teal-400 to-cyan-600',
];

const validateEmail = (email: string) => {
  const re = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  return re.test(String(email).toLowerCase());
};

export function SignersSidebar({ documentId }: SignersSidebarProps) {
  const {
    signatureFields,
    selectedFieldId,
    updateSignatureFieldInStore,
    pageDimensions,
  } = useDocumentEditorStore();

  const [newSignerEmail, setNewSignerEmail] = React.useState('');
  const [newSignerName, setNewSignerName] = React.useState('');
  const [emailError, setEmailError] = React.useState('');

  const addSigner = useMutation(api.signers.addSigner);
  const updateSignatureFieldMutation = useMutation(
    api.signatureFields.updateSignatureField,
  );
  
  // Fetch user's previous signers to suggest them in the form
  const { user } = useUser();
  const signers = useQuery(
    api.signers.getUserSigners,
    user ? { ownerId: user.id } : "skip"
  );

  const selectedField = signatureFields.find(field => field.id === selectedFieldId);

  const handleAddSigner = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const email = newSignerEmail.trim();
    const name = newSignerName.trim();

    if (!email) {
      setEmailError("Email is required");
      return;
    }

    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address");
      return;
    }

    if (signers?.find((s) => s.email === email)) {
      setEmailError("This email is already added");
      return;
    }

    try {
      const newSigner: Signer = {
        email,
        name: name || undefined,
      };

      // Add to backend
      await addSigner({
        documentId,
        email: newSigner.email,
        name: newSigner.name,
      });

      // Reset form
      setNewSignerEmail('');
      setNewSignerName('');
      setEmailError('');
      
      toast.success("Signer added successfully");
    } catch (error) {
      console.error("Error adding signer:", error);
      toast.error("Failed to add signer");
    }
  };

  const handleRemoveSigner = (email: string) => {
    // Remove signer assignments from fields
    const fieldsToUpdate = signatureFields.filter(
      field => field.assignedToEmail === email
    );

    // Update all affected fields in store optimistically
    fieldsToUpdate.forEach(field => {
      const updatedField = { ...field, assignedToEmail: '', assignedToName: '' };
      updateSignatureFieldInStore(updatedField);

      // Update in backend
      const dims = pageDimensions[field.page];
      if (dims) {
        updateSignatureFieldMutation({
          fieldId: field.id as Id<"signatureFields">,
          x: field.normalizedX * dims.width,
          y: field.normalizedY * dims.height,
          width: field.normalizedWidth * dims.width,
          height: field.normalizedHeight * dims.height,
          assignedToEmail: '',
          assignedToName: '',
          label: field.label,
          isRequired: field.isRequired,
        }).catch(error => {
          // If backend update fails, revert the field update
          console.error("Error updating field in backend:", error);
          updateSignatureFieldInStore(field);
          toast.error("Failed to update field assignment");
        });
      }
    });

    toast.success("Signer removed");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleAddSigner(e as any);
    }
  };

  // Render field settings if a field is selected, otherwise show signers list
  if (selectedField) {
    return (
      <aside className="w-80 bg-white border-l p-4 flex flex-col h-full">
        <div className="flex items-center mb-4">
          <Settings className="w-5 h-5 mr-2 text-blue-600" />
          <h3 className="text-lg font-semibold">Field Settings</h3>
        </div>

        <div className="flex-1 overflow-y-auto">
          <SignatureFieldSettings
            field={selectedField}
            onFieldUpdate={(updates) => {
              const updatedField = { ...selectedField, ...updates };
              updateSignatureFieldInStore(updatedField);
            }}
            signers={signers ?? []}
          />
        </div>
      </aside>
    );
  }

  return (
    <aside className="w-80 bg-white border-l p-4 flex flex-col h-full">
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-4">Signers</h3>

        {/* Add Signer Form */}
        <form onSubmit={handleAddSigner} className="mb-6 space-y-3 relative">
          <div className="space-y-2">
            <div className="relative">
              <Input
                type="email"
                placeholder="Signer email"
                value={newSignerEmail}
                onChange={(e) => {
                  setNewSignerEmail(e.target.value);
                  if (emailError) setEmailError("");
                }}
                onKeyPress={handleKeyPress}
                className={emailError ? "border-red-500" : ""}
              />
              {/* Dropdown for previous signers */}
              {signers && signers.length > 0 && newSignerEmail && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-auto">
                  {signers
                    .filter(signer => 
                      signer.email.toLowerCase().includes(newSignerEmail.toLowerCase()) ||
                      (signer.name && signer.name.toLowerCase().includes(newSignerEmail.toLowerCase()))
                    )
                    .map((signer, index) => (
                      <div
                        key={index}
                        className="p-3 hover:bg-gray-100 cursor-pointer border-b border-gray-100 last:border-b-0"
                        onClick={() => {
                          setNewSignerEmail(signer.email);
                          if (signer.name && !newSignerName) {
                            setNewSignerName(signer.name);
                          }
                        }}
                      >
                        <div className="font-medium">{signer.name || signer.email}</div>
                        <div className="text-sm text-gray-500">{signer.email}</div>
                        <div className="text-xs text-gray-400">Used in: {signer.documentTitle}</div>
                      </div>
                    ))}
                </div>
              )}
            </div>
            {emailError && <p className="text-sm text-red-500">{emailError}</p>}
            
            <Input
              type="text"
              placeholder="Signer name (optional)"
              value={newSignerName}
              onChange={(e) => setNewSignerName(e.target.value)}
              onKeyPress={handleKeyPress}
            />
          </div>
          <Button type="submit" className="w-full">
            <UserPlus className="w-4 h-4 mr-2" />
            Add Signer
          </Button>
        </form>

        <Separator />
      </div>

      {/* Signers List */}
      <div className="flex-1 overflow-y-auto">
        <h4 className="text-sm font-medium text-gray-700 mb-3">Added Signers</h4>

        {signers?.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full py-10 text-center">
            <UserPlus className="w-10 h-10 mx-auto text-gray-400 mb-3" />
            <p className="text-sm text-gray-500">No signers added yet</p>
            <p className="text-xs text-gray-400 mt-1">
              Add an email address to get started
            </p>
          </div>
        ) : (
          <ul className="space-y-3">
            {signers?.map((signer, index) => {
              const signerFields = signatureFields.filter(
                field => field.assignedToEmail === signer.email
              );

              return (
                <li
                  key={signer.email}
                  className="border rounded-lg p-3 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3">
                      <div className={cn(
                        'w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-medium bg-gradient-to-bl',
                        gradients[index % gradients.length]
                      )}>
                        {signer.name?.charAt(0) || signer.email.charAt(0)}
                      </div>

                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">
                          {signer.name || signer.email}
                        </p>
                        <p className="text-xs text-gray-500 truncate">
                          {signer.email}
                        </p>

                        {signerFields.length > 0 && (
                          <div className="mt-2">
                            <p className="text-xs text-gray-600">
                              Fields assigned: {signerFields.length}
                            </p>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {signerFields.slice(0, 3).map(field => (
                                <span
                                  key={field.id}
                                  className="text-xs bg-gray-100 px-2 py-0.5 rounded"
                                >
                                  {field.fieldType}
                                </span>
                              ))}
                              {signerFields.length > 3 && (
                                <span className="text-xs text-gray-500">
                                  +{signerFields.length - 3} more
                                </span>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </aside>
  );
}