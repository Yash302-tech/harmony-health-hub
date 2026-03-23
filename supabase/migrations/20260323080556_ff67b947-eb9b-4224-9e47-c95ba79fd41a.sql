-- Restrict contact message insertion to authenticated users only
DROP POLICY "Anyone can insert contact messages" ON public.contact_messages;
CREATE POLICY "Authenticated users can insert contact messages" ON public.contact_messages FOR INSERT TO authenticated WITH CHECK (true);