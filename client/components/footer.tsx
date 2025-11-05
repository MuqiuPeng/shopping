import { Instagram, Facebook, Twitter } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div>
            <h3 className="text-xl font-light mb-4">Pearl & Crystal</h3>
            <p className="font-light text-sm opacity-80">Timeless elegance for every occasion</p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-light text-sm mb-4 uppercase tracking-wide">About</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="font-light text-sm opacity-80 hover:opacity-100 transition">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="font-light text-sm opacity-80 hover:opacity-100 transition">
                  Our Story
                </a>
              </li>
              <li>
                <a href="#" className="font-light text-sm opacity-80 hover:opacity-100 transition">
                  Sustainability
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-light text-sm mb-4 uppercase tracking-wide">Support</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="font-light text-sm opacity-80 hover:opacity-100 transition">
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="font-light text-sm opacity-80 hover:opacity-100 transition">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="font-light text-sm opacity-80 hover:opacity-100 transition">
                  Shipping
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-light text-sm mb-4 uppercase tracking-wide">Legal</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="font-light text-sm opacity-80 hover:opacity-100 transition">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="font-light text-sm opacity-80 hover:opacity-100 transition">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="font-light text-sm opacity-80 hover:opacity-100 transition">
                  Returns
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <div className="border-t border-primary-foreground/20 pt-12 pb-8">
          <h4 className="font-light text-sm mb-4">Subscribe to Our Newsletter</h4>
          <div className="flex gap-2 max-w-sm">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 bg-primary-foreground/10 border border-primary-foreground/20 rounded-lg font-light text-sm placeholder:opacity-60 focus:outline-none focus:ring-2 focus:ring-accent"
            />
            <button className="px-6 py-2 bg-accent text-accent-foreground font-light rounded-lg hover:opacity-90 transition">
              Subscribe
            </button>
          </div>
        </div>

        {/* Social & Bottom */}
        <div className="border-t border-primary-foreground/20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex gap-4">
            <a href="#" className="p-2 hover:bg-primary-foreground/10 rounded-lg transition">
              <Instagram className="w-5 h-5" />
            </a>
            <a href="#" className="p-2 hover:bg-primary-foreground/10 rounded-lg transition">
              <Facebook className="w-5 h-5" />
            </a>
            <a href="#" className="p-2 hover:bg-primary-foreground/10 rounded-lg transition">
              <Twitter className="w-5 h-5" />
            </a>
          </div>
          <p className="font-light text-sm opacity-80">© 2025 Pearl & Crystal. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
