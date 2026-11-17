export const netzwerkNamen = ['Facebook', 'Instagram', 'YouTube'] as const;

export type NetzwerkName = (typeof netzwerkNamen)[number];

export function istNetzwerkName(name: string): name is NetzwerkName {
  return (netzwerkNamen as readonly string[]).includes(name);
}
