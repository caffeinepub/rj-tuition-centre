import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  type AdminCredentials,
  type ClassTimings,
  getAdminCredentials,
  getClassTimings,
  setAdminCredentials,
  setClassTimings,
} from "@/utils/siteSettings";
import { AlertCircle, Clock, KeyRound, Save } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const STORAGE_KEY = "rj_site_settings";

const defaults = {
  phone1: "+91 9600243654",
  phone2: "+91 9994286764",
  phone3: "+91 8870528018",
  email: "rjtuitioncentre@gmail.com",
  address: "Thanjavur, Tamil Nadu, India",
  whatsapp: "919600243654",
  siteName: "RJ Tuition Centre",
  tagline:
    "Expert home tuition and online classes for grades 1\u201312 in Thanjavur",
  copyrightYear: "2026",
  location: "Thanjavur",
};

type Settings = typeof defaults;

const PRESETS = ["6 AM \u2013 6 PM", "6 AM \u2013 9 PM"];

function loadSettings(): Settings {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return { ...defaults, ...JSON.parse(raw) };
  } catch (_) {
    // ignore
  }
  return { ...defaults };
}

export default function AdminSiteSettings() {
  const [settings, setSettings] = useState<Settings>(loadSettings);
  const [creds, setCreds] = useState<AdminCredentials>(getAdminCredentials);
  const [timingsState, setTimingsState] =
    useState<ClassTimings>(getClassTimings);

  const set =
    (key: keyof Settings) => (e: React.ChangeEvent<HTMLInputElement>) =>
      setSettings((prev) => ({ ...prev, [key]: e.target.value }));

  const handleSave = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    toast.success("Site settings saved successfully!");
  };

  const handleSaveCreds = () => {
    if (!creds.username.trim() || !creds.password.trim()) {
      toast.error("Username and password cannot be empty.");
      return;
    }
    setAdminCredentials(creds);
    toast.success(
      "Admin credentials updated! Use the new credentials next time you log in.",
    );
  };

  const handleSaveTimings = () => {
    const display = timingsState.useCustom
      ? timingsState.customText.trim() || "6 AM \u2013 6 PM"
      : timingsState.display;
    const updated = { ...timingsState, display };
    setClassTimings(updated);
    setTimingsState(updated);
    toast.success("Class timings saved!");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-brand-navy">Site Settings</h1>
          <p className="text-gray-500 text-sm mt-1">
            Manage admin credentials, class timings, and key site details
          </p>
        </div>
      </div>

      {/* Admin Credentials */}
      <Card>
        <CardHeader>
          <CardTitle className="text-brand-navy flex items-center gap-2">
            <KeyRound size={18} /> Admin Credentials
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-start gap-3 bg-orange-50 border border-orange-200 rounded-lg p-3">
            <AlertCircle
              size={16}
              className="text-orange-600 mt-0.5 shrink-0"
            />
            <p className="text-orange-800 text-xs">
              If you change these credentials, you must use the new ones to log
              in next time. Write them down before saving.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="admin-username">Username</Label>
              <Input
                id="admin-username"
                value={creds.username}
                onChange={(e) =>
                  setCreds((c) => ({ ...c, username: e.target.value }))
                }
                placeholder="Admin username"
                data-ocid="site_settings.input"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="admin-password">Password</Label>
              <Input
                id="admin-password"
                type="text"
                value={creds.password}
                onChange={(e) =>
                  setCreds((c) => ({ ...c, password: e.target.value }))
                }
                placeholder="Admin password"
                data-ocid="site_settings.input"
              />
            </div>
          </div>
          <Button
            onClick={handleSaveCreds}
            className="bg-brand-navy hover:bg-brand-blue"
            data-ocid="site_settings.save_creds_button"
          >
            <Save size={16} className="mr-2" />
            Save Credentials
          </Button>
        </CardContent>
      </Card>

      {/* Class Timings */}
      <Card>
        <CardHeader>
          <CardTitle className="text-brand-navy flex items-center gap-2">
            <Clock size={18} /> Class Timings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-gray-500">
            This timing is displayed in the &quot;Flexible Timings&quot; card on
            the homepage.
          </p>
          <div className="space-y-3">
            {PRESETS.map((preset) => (
              <label
                key={preset}
                className="flex items-center gap-3 cursor-pointer"
              >
                <input
                  type="radio"
                  name="timing"
                  checked={
                    !timingsState.useCustom && timingsState.display === preset
                  }
                  onChange={() =>
                    setTimingsState({
                      display: preset,
                      useCustom: false,
                      customText: "",
                    })
                  }
                  className="accent-brand-blue"
                />
                <span className="text-sm font-medium">{preset}</span>
              </label>
            ))}
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="radio"
                name="timing"
                checked={timingsState.useCustom}
                onChange={() =>
                  setTimingsState((t) => ({ ...t, useCustom: true }))
                }
                className="accent-brand-blue"
              />
              <span className="text-sm font-medium">Custom</span>
            </label>
          </div>
          {timingsState.useCustom && (
            <div className="space-y-1.5">
              <Label htmlFor="custom-timing">Custom Time</Label>
              <Input
                id="custom-timing"
                value={timingsState.customText}
                onChange={(e) =>
                  setTimingsState((t) => ({ ...t, customText: e.target.value }))
                }
                placeholder="e.g. 7 AM \u2013 8 PM"
                data-ocid="site_settings.input"
              />
            </div>
          )}
          <Button
            onClick={handleSaveTimings}
            className="bg-brand-navy hover:bg-brand-blue"
            data-ocid="site_settings.save_timings_button"
          >
            <Save size={16} className="mr-2" />
            Save Timings
          </Button>
        </CardContent>
      </Card>

      {/* Info notice */}
      <div className="flex items-start gap-3 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <AlertCircle size={18} className="text-yellow-600 mt-0.5 shrink-0" />
        <p className="text-yellow-800 text-sm">
          <strong>Note:</strong> Contact details below are saved in your browser
          for reference. They do not automatically update the live website text.
        </p>
      </div>

      {/* Contact Information */}
      <Card>
        <CardHeader>
          <CardTitle className="text-brand-navy">Contact Information</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label htmlFor="phone1">Phone 1</Label>
            <Input
              id="phone1"
              value={settings.phone1}
              onChange={set("phone1")}
              data-ocid="site_settings.input"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="phone2">Phone 2</Label>
            <Input
              id="phone2"
              value={settings.phone2}
              onChange={set("phone2")}
              data-ocid="site_settings.input"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="phone3">Phone 3</Label>
            <Input
              id="phone3"
              value={settings.phone3}
              onChange={set("phone3")}
              data-ocid="site_settings.input"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              value={settings.email}
              onChange={set("email")}
              data-ocid="site_settings.input"
            />
          </div>
          <div className="space-y-1.5 md:col-span-2">
            <Label htmlFor="address">Address</Label>
            <Input
              id="address"
              value={settings.address}
              onChange={set("address")}
              data-ocid="site_settings.input"
            />
          </div>
          <div className="space-y-1.5 md:col-span-2">
            <Label htmlFor="whatsapp">
              WhatsApp Number{" "}
              <span className="text-gray-400 font-normal text-xs">
                (used in wa.me link, e.g. 919600243654)
              </span>
            </Label>
            <Input
              id="whatsapp"
              value={settings.whatsapp}
              onChange={set("whatsapp")}
              data-ocid="site_settings.input"
            />
          </div>
        </CardContent>
      </Card>

      {/* Site Info */}
      <Card>
        <CardHeader>
          <CardTitle className="text-brand-navy">Site Information</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label htmlFor="siteName">Site Name</Label>
            <Input
              id="siteName"
              value={settings.siteName}
              onChange={set("siteName")}
              data-ocid="site_settings.input"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              value={settings.location}
              onChange={set("location")}
              data-ocid="site_settings.input"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="copyrightYear">Copyright Year</Label>
            <Input
              id="copyrightYear"
              value={settings.copyrightYear}
              onChange={set("copyrightYear")}
              data-ocid="site_settings.input"
            />
          </div>
          <div className="space-y-1.5 md:col-span-2">
            <Label htmlFor="tagline">Tagline</Label>
            <Input
              id="tagline"
              value={settings.tagline}
              onChange={set("tagline")}
              data-ocid="site_settings.input"
            />
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button
          onClick={handleSave}
          className="bg-brand-navy hover:bg-brand-blue"
          data-ocid="site_settings.submit_button"
        >
          <Save size={16} className="mr-2" />
          Save Contact & Site Info
        </Button>
      </div>
    </div>
  );
}
