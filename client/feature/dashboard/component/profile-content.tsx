import { Phone, Home, Edit3, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface User {
  name: string;
  email: string;
  phone: string;
  homeAddress: string;
}

interface ProfileData {
  phone: string;
  homeAddress: string;
}

interface ProfileContentProps {
  user: User;
  editingProfile: boolean;
  profileData: ProfileData;
  onEditClick: () => void;
  onSave: () => void;
  onCancel: () => void;
  onProfileDataChange: (data: ProfileData) => void;
}

export default function ProfileContent({
  user,
  editingProfile,
  profileData,
  onEditClick,
  onSave,
  onCancel,
  onProfileDataChange,
}: ProfileContentProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-light text-foreground">
          Personal Information
        </h2>
        {!editingProfile && (
          <Button onClick={onEditClick} size="sm">
            <Edit3 className="w-4 h-4 mr-2" />
            Edit Information
          </Button>
        )}
      </div>

      <div className="bg-card border border-border rounded-xl p-6">
        <div className="space-y-6">
          {/* Read-only information */}
          <div className="space-y-4">
            <h3 className="font-medium text-foreground border-b border-border pb-2">
              Basic Information (from Clerk)
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-muted-foreground">Name</label>
                <div className="mt-1 p-3 bg-secondary rounded-lg text-foreground">
                  {user.name}
                </div>
              </div>
              <div>
                <label className="text-sm text-muted-foreground">Email</label>
                <div className="mt-1 p-3 bg-secondary rounded-lg text-foreground">
                  {user.email}
                </div>
              </div>
            </div>
          </div>

          {/* Editable information */}
          <div className="space-y-4">
            <h3 className="font-medium text-foreground border-b border-border pb-2">
              Contact Information
            </h3>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  <Phone className="w-4 h-4 inline mr-2" />
                  Phone Number
                </label>
                {editingProfile ? (
                  <Input
                    value={profileData.phone}
                    onChange={(e) =>
                      onProfileDataChange({
                        ...profileData,
                        phone: e.target.value,
                      })
                    }
                    placeholder="Enter phone number"
                  />
                ) : (
                  <div className="p-3 bg-secondary rounded-lg text-foreground">
                    {profileData.phone}
                  </div>
                )}
              </div>

              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  <Home className="w-4 h-4 inline mr-2" />
                  Home Address
                </label>
                {editingProfile ? (
                  <Input
                    value={profileData.homeAddress}
                    onChange={(e) =>
                      onProfileDataChange({
                        ...profileData,
                        homeAddress: e.target.value,
                      })
                    }
                    placeholder="Enter home address"
                  />
                ) : (
                  <div className="p-3 bg-secondary rounded-lg text-foreground">
                    {profileData.homeAddress}
                  </div>
                )}
              </div>
            </div>

            {editingProfile && (
              <div className="flex space-x-3 pt-4">
                <Button onClick={onSave}>
                  <Check className="w-4 h-4 mr-2" />
                  Save Changes
                </Button>
                <Button variant="outline" onClick={onCancel}>
                  Cancel
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
