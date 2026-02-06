'use client';

import { supabaseClient } from "@/lib/supabase/client";

const ClientTestPage = () => {

    console.log('supabaseClient in client test page:', supabaseClient);
    return (
        <div>ClientTestPage</div>
    )
}

export default ClientTestPage