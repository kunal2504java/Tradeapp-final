import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Mail, Check } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const NewsletterSection = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      toast({
        title: "Successfully Subscribed!",
        description: "Thank you for subscribing to our newsletter. You'll receive the latest updates about cryptocurrency trading and market insights.",
      });
      setEmail('');
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  return (
    <section className="py-16 bg-gold">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Mail className="h-8 w-8 text-navy" />
            <h2 className="text-3xl md:text-4xl font-bold text-navy font-poppins">
              Subscribe To Our Newsletter
            </h2>
          </div>
          
          <p className="text-navy/80 text-lg mb-8 max-w-2xl mx-auto">
            Stay updated with the latest cryptocurrency market trends, trading strategies, 
            and exclusive insights from our expert analysts. Join our community of successful traders.
          </p>

          <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <div className="flex gap-4">
              <div className="flex-1">
                <Input
                  type="email"
                  placeholder="Your Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-white border-2 border-navy/20 focus:border-navy text-navy placeholder:text-navy/60"
                />
              </div>
              <Button 
                type="submit"
                className="bg-navy text-gold hover:bg-navy/90 font-semibold px-8"
                disabled={isSubscribed}
              >
                {isSubscribed ? (
                  <>
                    <Check className="h-4 w-4 mr-2" />
                    Subscribed
                  </>
                ) : (
                  'Submit'
                )}
              </Button>
            </div>
          </form>

          <div className="mt-8 flex flex-wrap justify-center items-center gap-6 text-navy/70 text-sm">
            <span>Join 50,000+ subscribers</span>
            <span>•</span>
            <span>Weekly market insights</span>
            <span>•</span>
            <span>Exclusive trading tips</span>
            <span>•</span>
            <span>Unsubscribe anytime</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;