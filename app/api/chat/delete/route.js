import connectDB from "@/config/db";
import Chat from "@/models/Chat";
import { NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server";

export async function POST(req) {
   try{
        const { userId } = getAuth(req);
        const { chatId } = await req.json();

        if (!userId) {
            return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
        }

        await connectDB();
        
        await Chat.findByIdAndDelete({_id:chatId,userId});

        return NextResponse.json({ success: true, message: "Chat deleted successfully" }, { status: 200 });

   }
    catch (error) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
}