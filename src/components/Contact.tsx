import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ContactMessage } from '../types';
import { PERSONAL_INFO } from '../data';
import { Send, Check, Mail, Phone, MapPin, Inbox, RefreshCw, MessageSquare } from 'lucide-react';

export default function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('Internship Opportunity');
  const [message, setMessage] = useState('');
  
  const [messagesList, setMessagesList] = useState<ContactMessage[]>([]);
  const [isSending, setIsSending] = useState(false);
  const [success, setSuccess] = useState(false);

  // Load existing messages from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('portfolio_messages');
    if (stored) {
      try {
        setMessagesList(JSON.parse(stored));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    setIsSending(true);

    setTimeout(() => {
      const newMessage: ContactMessage = {
        id: Math.random().toString(36).substr(2, 9),
        name,
        email,
        subject,
        message,
        timestamp: new Date().toLocaleString(),
        isAutoReplied: true
      };

      const updated = [newMessage, ...messagesList];
      setMessagesList(updated);
      localStorage.setItem('portfolio_messages', JSON.stringify(updated));

      // Trigger auto-reply sequence
      generateAutoReply(newMessage);

      setIsSending(false);
      setSuccess(true);
      
      // Reset inputs
      setName('');
      setEmail('');
      setMessage('');

      setTimeout(() => setSuccess(false), 3000);
    }, 1200);
  };

  const generateAutoReply = (msg: ContactMessage) => {
    let replyText = '';
    switch (msg.subject) {
      case 'Internship Opportunity':
        replyText = `Hi ${msg.name}, thank you so much for reaching out! I am highly interested in software development and CS internships. I've initiated an automated notification on my endpoint. I'll reach back to you at ${msg.email} inside 24 hours!`;
        break;
      case 'Project Collaboration':
        replyText = `Hello ${msg.name}! Your collaboration proposal sounds wonderful. I enjoy linking Python scripts with databases and IoT sensor loops. Let me inspect my scheduler and I'll send an email callback soon!`;
        break;
      default:
        replyText = `Hello ${msg.name}, thanks for your message! This is a simulated automatic response. I will review your comments and reach out promptly.`;
    }

    setTimeout(() => {
      const replyMessage: ContactMessage = {
        id: 'reply-' + Math.random().toString(36).substr(2, 9),
        name: 'ASAIKUMARAN M (Auto-Response)',
        email: PERSONAL_INFO.email,
        subject: `Re: ${msg.subject}`,
        message: replyText,
        timestamp: new Date().toLocaleString(),
        isAutoReplied: false
      };

      setMessagesList((prev) => {
        const withReply = [replyMessage, ...prev];
        localStorage.setItem('portfolio_messages', JSON.stringify(withReply));
        return withReply;
      });
    }, 2000);
  };

  const handleClearMessages = () => {
    setMessagesList([]);
    localStorage.removeItem('portfolio_messages');
  };

  return (
    <section id="contact" className="py-24 bg-[#0A0A0A] text-[#F0F0F0] relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-20 space-y-4">
          <span className="text-[10px] tracking-[0.3em] uppercase text-white/40 block font-sans">
            Inquiries
          </span>
          <h2 className="text-3xl font-light tracking-tight text-white sm:text-4xl font-serif">
            Get In <span className="italic">Touch</span>
          </h2>
          <div className="h-px w-12 bg-white/20 mx-auto mt-4" />
          <p className="text-sm font-light text-white/50 leading-relaxed font-sans max-w-xl mx-auto">
            Have an internship opening, research opportunity, or project collaboration request? Drop a message into the local inbox.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Info Details Section - Left Span 5 */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-3">
              <h3 className="text-xs uppercase tracking-[0.25em] font-sans font-bold text-white mb-2">Core Contact Registry</h3>
              <p className="text-xs sm:text-sm font-light text-white/50 leading-relaxed font-sans">
                Located and active in India. Open to remote or on-site computer science engagements.
              </p>
            </div>

            {/* List Contact Elements */}
            <div className="space-y-4 font-sans text-xs">
              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                className="p-5 bg-[#121212] border border-white/5 flex items-center gap-4 hover:border-white/15 transition-all group"
              >
                <div className="p-2.5 border border-white/10 bg-white/5 text-white/60 group-hover:text-white transition-all">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[9px] text-[#8E8E8E] uppercase tracking-widest font-sans">Email Address</div>
                  <div className="text-white text-sm mt-0.5 font-serif font-light tracking-wide">{PERSONAL_INFO.email}</div>
                </div>
              </a>

              <a
                href={`tel:${PERSONAL_INFO.phone}`}
                className="p-5 bg-[#121212] border border-white/5 flex items-center gap-4 hover:border-white/15 transition-all group"
              >
                <div className="p-2.5 border border-white/10 bg-white/5 text-white/60 group-hover:text-white transition-all">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[9px] text-[#8E8E8E] uppercase tracking-widest font-sans">Direct Telephone</div>
                  <div className="text-white text-sm mt-0.5 font-serif font-light tracking-wide">+91 {PERSONAL_INFO.phone}</div>
                </div>
              </a>

              <div className="p-5 bg-[#121212] border border-white/5 flex items-center gap-4 group">
                <div className="p-2.5 border border-white/10 bg-white/5 text-white/60">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[9px] text-[#8E8E8E] uppercase tracking-widest font-sans">Operational Center</div>
                  <div className="text-white text-sm mt-0.5 font-serif font-light tracking-wide">{PERSONAL_INFO.location}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Input Form - Right Span 7 */}
          <div className="lg:col-span-7 space-y-8">
            <form onSubmit={handleSubmit} className="p-6 sm:p-8 bg-[#121212] border border-white/5 space-y-5 relative rounded-none shadow-sm">
              <h3 className="text-xs uppercase tracking-[0.2em] font-sans font-bold text-white flex items-center gap-2">
                <MessageSquare className="w-3.5 h-3.5 text-white/50" />
                <span>Emit Local Inquiry</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Name */}
                <div className="space-y-1.5 font-sans">
                  <label htmlFor="form-name" className="text-[9px] uppercase tracking-widest text-white/40 font-medium">Your Name</label>
                  <input
                    id="form-name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="E.g. Dr. Helen Carter"
                    className="w-full bg-[#0A0A0A] border border-white/10 focus:border-white/50 px-4 py-3 rounded-none text-white placeholder-white/20 text-xs sm:text-sm focus:outline-none transition-all font-light"
                  />
                </div>

                {/* Email */}
                <div className="space-y-1.5 font-sans">
                  <label htmlFor="form-email" className="text-[9px] uppercase tracking-widest text-white/40 font-medium">Email Address</label>
                  <input
                    id="form-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="E.g. you@example.com"
                    className="w-full bg-[#0A0A0A] border border-white/10 focus:border-white/50 px-4 py-3 rounded-none text-white placeholder-white/20 text-xs sm:text-sm focus:outline-none transition-all font-light"
                  />
                </div>
              </div>

              {/* Subject Selection dropdown */}
              <div className="space-y-1.5 font-sans">
                <label htmlFor="form-subject" className="text-[9px] uppercase tracking-widest text-white/40 font-medium">Category</label>
                <select
                  id="form-subject"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full bg-[#0A0A0A] border border-white/10 focus:border-white/50 px-4 py-3 rounded-none text-white text-xs sm:text-sm focus:outline-none transition-all cursor-pointer font-light"
                >
                  <option value="Internship Opportunity">Internship Opportunity</option>
                  <option value="Project Collaboration">Project Collaboration</option>
                  <option value="Other Technical Query">Other Technical Query</option>
                </select>
              </div>

              {/* Message */}
              <div className="space-y-1.5 font-sans">
                <label htmlFor="form-message" className="text-[9px] uppercase tracking-widest text-white/40 font-medium">Message Details</label>
                <textarea
                  id="form-message"
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Hey, let's connect regarding engineering openings..."
                  className="w-full bg-[#0A0A0A] border border-white/10 focus:border-white/50 px-4 py-3 rounded-none text-white placeholder-white/20 text-xs sm:text-sm focus:outline-none transition-all resize-none font-light"
                />
              </div>

              {/* Triggers */}
              <button
                id="submit-contact-btn"
                type="submit"
                disabled={isSending}
                className="w-full py-3.5 bg-white hover:bg-neutral-200 text-black font-sans uppercase tracking-[0.2em] text-[10px] sm:text-xs font-semibold border border-white transition-all duration-300 rounded-none cursor-pointer flex items-center justify-center gap-2"
              >
                {isSending ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Transmitting packet...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-3 h-3" />
                    <span>EMIT CLOUD MESSAGE</span>
                  </>
                )}
              </button>

              {/* Success Banner message */}
              <AnimatePresence>
                {success && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="p-4 bg-[#0A0A0A] border border-white/10 text-white text-xs flex items-center gap-2.5 font-sans font-light"
                  >
                    <Check className="w-4 h-4 text-white" />
                    <span>Broadcast recorded. Launching simulated auto-reply thread down below.</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>

            {/* Simulated Live Inbox Terminal Panel */}
            <div className="space-y-4 p-6 bg-[#121212] border border-white/5 rounded-none">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Inbox className="w-4 h-4 text-white/50" />
                  <h4 className="text-[9px] text-[#8E8E8E] uppercase tracking-[0.25em] font-sans font-bold">
                    Local Inbox Logs ({messagesList.length})
                  </h4>
                </div>
                
                {messagesList.length > 0 && (
                  <button
                    id="clear-messages-btn"
                    onClick={handleClearMessages}
                    className="text-[9px] text-white/30 hover:text-white tracking-widest uppercase font-sans underline cursor-pointer"
                  >
                    Clear logs
                  </button>
                )}
              </div>

              {/* Terminal List feed */}
              <div id="mailbox-logs-container" className="space-y-3 max-h-[220px] overflow-y-auto pr-1 text-xs scrollbar-none">
                {messagesList.length === 0 ? (
                  <div className="text-center py-8 text-white/30 italic font-sans font-light">
                    Mailbox terminal active. Submit the contact form above to write local entries.
                  </div>
                ) : (
                  messagesList.map((msg) => (
                    <div
                      key={msg.id}
                      className={`p-4 border font-sans ${
                        msg.isAutoReplied
                          ? 'bg-[#0A0A0A] border-white/5'
                          : 'bg-white/[0.02] border-white/10'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-4 font-light text-white/80">
                        <div>
                          <span className="font-serif italic font-medium">{msg.name}</span>
                          <span className="text-white/20 mx-1.5">|</span>
                          <span className="text-[9px] text-white/40">{msg.email}</span>
                        </div>
                        <span className="text-[9px] text-white/30 font-mono italic">{msg.timestamp.split(',')[1]}</span>
                      </div>

                      <div className="text-[8px] tracking-[0.15em] text-white/50 uppercase font-semibold mt-1.5">
                        Subject: {msg.subject}
                      </div>

                      <p className="text-white/60 font-light mt-2 leading-relaxed text-xs">
                        {msg.message}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
