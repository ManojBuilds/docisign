/**
 * Computes a SHA-256 hash of a file, blob, or ArrayBuffer.
 * Returns the hash as a hex string.
 */
export async function computeFileHash(data: File | Blob | ArrayBuffer): Promise<string> {
  const buffer = data instanceof ArrayBuffer ? data : await data.arrayBuffer();
  const hashBuffer = await crypto.subtle.digest('SHA-256', buffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}
