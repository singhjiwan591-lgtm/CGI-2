
import { NextResponse } from 'next/server';

type RecaptchaRequest = {
  event: {
    token: string;
    expectedAction: string;
    siteKey: string;
  }
}

/**
 * Handles the reCAPTCHA token verification.
 * @param request The incoming request with the reCAPTCHA token.
 * @returns A response indicating if the verification was successful.
 */
export async function POST(request: Request) {
  const body: RecaptchaRequest = await request.json();
  const token = body.event.token;
  const action = body.event.expectedAction;
  const siteKey = body.event.siteKey;

  if (!token || !action || !siteKey) {
    return NextResponse.json({ error: 'Missing required parameters.' }, { status: 400 });
  }

  const projectId = 'courses-1-11b17'; // Hardcoded project ID
  const apiKey = process.env.FIREBASE_API_KEY; 

  if (!apiKey) {
     return NextResponse.json({ error: 'Server configuration error: Missing API Key.' }, { status: 500 });
  }

  const verificationUrl = `https://recaptchaenterprise.googleapis.com/v1/projects/${projectId}/assessments?key=${apiKey}`;

  try {
    const recaptchaResponse = await fetch(verificationUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        event: {
          token: token,
          siteKey: siteKey,
          expectedAction: action,
        },
      }),
    });

    const assessment = await recaptchaResponse.json();

    if (!recaptchaResponse.ok) {
        console.error('reCAPTCHA assessment failed:', assessment);
        return NextResponse.json({ success: false, error: 'reCAPTCHA assessment request failed.', details: assessment }, { status: 500 });
    }

    // Check if the token is valid and the action matches.
    if (assessment.tokenProperties?.valid && assessment.tokenProperties?.action === action) {
        // You can check the score here to decide if the user is a bot or not.
        // For example, score > 0.7 is likely a human.
        const score = assessment.riskAnalysis?.score ?? 0;
        if (score > 0.5) { // Threshold can be adjusted
             return NextResponse.json({ success: true, score: score });
        } else {
             return NextResponse.json({ success: false, error: 'Low reCAPTCHA score.', score: score }, { status: 403 });
        }
    } else {
      return NextResponse.json({ success: false, error: 'Invalid reCAPTCHA token or action mismatch.' }, { status: 400 });
    }
  } catch (error) {
    console.error('Error verifying reCAPTCHA:', error);
    return NextResponse.json({ success: false, error: 'Internal server error during reCAPTCHA verification.' }, { status: 500 });
  }
}
