import { Home, Edit3, Trash2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Address {
  id: number;
  label: string;
  name: string;
  phone: string;
  address: string;
  isDefault: boolean;
}

interface AddressesContentProps {
  addresses: Address[];
}

export default function AddressesContent({ addresses }: AddressesContentProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-light text-foreground">
          Shipping Addresses
        </h2>
        <Button size="sm">
          <Plus className="w-4 h-4 mr-2" />
          Add Address
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {addresses.map((address) => (
          <div
            key={address.id}
            className="bg-card border border-border rounded-xl p-6 relative"
          >
            {address.isDefault && (
              <div className="absolute top-4 right-4 bg-accent text-accent-foreground px-2 py-1 rounded-full text-xs">
                Default Address
              </div>
            )}

            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Home className="w-4 h-4 text-accent" />
                <span className="font-medium text-foreground">
                  {address.label}
                </span>
              </div>

              <div className="space-y-1 text-sm">
                <div className="text-foreground">{address.name}</div>
                <div className="text-muted-foreground">{address.phone}</div>
                <div className="text-muted-foreground">{address.address}</div>
              </div>

              <div className="flex space-x-2 pt-3">
                <Button variant="outline" size="sm">
                  <Edit3 className="w-4 h-4 mr-2" />
                  Edit
                </Button>
                <Button variant="outline" size="sm">
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
