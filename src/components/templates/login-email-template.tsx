interface LoginEmailTemplateProps {
  firstName?: string;
  email: string;
  otp: string;
}

const LoginEmailTemplate = ({
  firstName,
  email,
  otp,
}: LoginEmailTemplateProps): string => {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>YouthAF Login Verification</title>
    </head>
    <body style="margin: 0; padding: 0; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
      <!-- Email Container -->
      <div style="max-width: 600px; margin: 40px auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);">

        <!-- Header -->
        <div style="background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%); padding: 48px 32px; text-align: center; position: relative;">
          <!-- Decorative elements -->
          <div style="position: absolute; top: -50px; right: -50px; width: 100px; height: 100px; background: rgba(255, 255, 255, 0.1); border-radius: 50%; opacity: 0.6;"></div>
          <div style="position: absolute; bottom: -30px; left: -30px; width: 60px; height: 60px; background: rgba(255, 255, 255, 0.1); border-radius: 50%; opacity: 0.4;"></div>

          <div style="position: relative; z-index: 10;">
            <!-- Logo -->
            <div style="display: inline-flex; align-items: center; justify-content: center; width: 64px; height: 64px; background: rgba(255, 255, 255, 0.15); border-radius: 16px; margin-bottom: 16px; backdrop-filter: blur(10px);">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="M16 3h5v5"/>
                <path d="M8 3H3v5"/>
                <path d="M12 22v-8.3a4 4 0 0 0-1.172-2.872L3 3"/>
                <path d="m15 9 6-6"/>
              </svg>
            </div>

            <h1 style="margin: 0; font-size: 32px; font-weight: 800; color: #ffffff; letter-spacing: -0.025em;">
              YouthAF
            </h1>
            <p style="margin: 8px 0 0 0; font-size: 16px; color: rgba(255, 255, 255, 0.9); font-weight: 500;">
              Skill Development Platform
            </p>
          </div>
        </div>

        <!-- Main Content -->
        <div style="padding: 48px 32px;">
          <!-- Greeting -->
          <div style="text-align: center; margin-bottom: 40px;">
            <h2 style="font-size: 28px; font-weight: 700; color: #1f2937; margin: 0 0 12px 0; letter-spacing: -0.025em;">
              ${firstName ? `Welcome back, ${firstName}!` : "Welcome back!"}
            </h2>
            <p style="font-size: 16px; color: #6b7280; margin: 0; line-height: 1.6;">
              We received a login request for your account
            </p>
            <div style="margin: 8px 0; padding: 8px 16px; background: #f3f4f6; border-radius: 20px; display: inline-block;">
              <span style="font-size: 14px; color: #4b5563; font-weight: 600;">${email}</span>
            </div>
          </div>

          <!-- OTP Section -->
          <div style="text-align: center; margin-bottom: 40px;">
            <p style="font-size: 14px; color: #6b7280; margin: 0 0 20px 0; text-transform: uppercase; font-weight: 600; letter-spacing: 0.1em;">
              Your Verification Code
            </p>

            <!-- OTP Container -->
            <div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border: 2px solid #e2e8f0; border-radius: 20px; padding: 32px; margin-bottom: 24px; position: relative; overflow: hidden;">
              <!-- Decorative background pattern -->
              <div style="position: absolute; top: -20px; left: -20px; width: 40px; height: 40px; background: linear-gradient(45deg, #6366f1, #8b5cf6); opacity: 0.1; border-radius: 50%;"></div>
              <div style="position: absolute; bottom: -15px; right: -15px; width: 30px; height: 30px; background: linear-gradient(45deg, #6366f1, #8b5cf6); opacity: 0.1; border-radius: 50%;"></div>

              <div style="position: relative; z-index: 10;">
                <div style="display: inline-flex; gap: 8px; margin-bottom: 16px;">
                  ${otp
                    .split("")
                    .map(
                      (digit) => `
                    <div style="width: 56px; height: 64px; background: #ffffff; border: 2px solid #e5e7eb; border-radius: 12px; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
                      <span style="font-size: 28px; font-weight: 800; color: #6366f1; font-family: 'SF Mono', Monaco, Consolas, monospace;">${digit}</span>
                    </div>
                  `
                    )
                    .join("")}
                </div>
                <p style="font-size: 12px; color: #9ca3af; margin: 0; font-weight: 500;">
                  Enter this code to complete your login
                </p>
              </div>
            </div>
          </div>

          <!-- Security Notice -->
          <div style="background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); border-left: 4px solid #f59e0b; border-radius: 12px; padding: 24px; margin-bottom: 32px;">
            <div style="display: flex; align-items: flex-start; gap: 12px;">
              <div style="flex-shrink: 0; width: 20px; height: 20px; margin-top: 2px;">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#d97706" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
                  <line x1="12" y1="9" x2="12" y2="13"/>
                  <line x1="12" y1="17" x2="12.01" y2="17"/>
                </svg>
              </div>
              <div>
                <h3 style="font-size: 16px; font-weight: 700; color: #92400e; margin: 0 0 8px 0;">
                  Security Notice
                </h3>
                <ul style="margin: 0; padding-left: 16px; color: #92400e; font-size: 14px; line-height: 1.5;">
                  <li style="margin-bottom: 4px;">This code expires in <strong>10 minutes</strong></li>
                  <li style="margin-bottom: 4px;">Never share this code with anyone</li>
                  <li>If you didn't request this, please ignore this email</li>
                </ul>
              </div>
            </div>
          </div>

          <!-- CTA Section -->
          <div style="text-align: center; margin-bottom: 32px;">
            <p style="font-size: 14px; color: #6b7280; margin: 0 0 16px 0;">
              Having trouble? We're here to help
            </p>
            <a href="mailto:support@youth-af.com" style="display: inline-flex; align-items: center; gap: 8px; background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%); color: #ffffff; text-decoration: none; padding: 12px 24px; border-radius: 10px; font-weight: 600; font-size: 14px; transition: all 0.2s;">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
              Contact Support
            </a>
          </div>
        </div>

        <!-- Footer -->
        <div style="background: #f8fafc; padding: 32px; text-align: center; border-top: 1px solid #e5e7eb;">
          <div style="margin-bottom: 16px;">
            <p style="font-size: 13px; color: #6b7280; margin: 0; font-weight: 600;">
              © 2024 YouthAF Platform. All rights reserved.
            </p>
          </div>
          <div style="display: flex; justify-content: center; gap: 24px; margin-bottom: 16px;">
            <a href="#" style="color: #9ca3af; text-decoration: none; font-size: 12px; font-weight: 500;">Privacy Policy</a>
            <a href="#" style="color: #9ca3af; text-decoration: none; font-size: 12px; font-weight: 500;">Terms of Service</a>
            <a href="#" style="color: #9ca3af; text-decoration: none; font-size: 12px; font-weight: 500;">Help Center</a>
          </div>
          <p style="font-size: 11px; color: #9ca3af; margin: 0; line-height: 1.5;">
            This email was sent to <strong>${email}</strong> because you requested a login verification code.<br>
            If this wasn't you, you can safely ignore this email.
          </p>
        </div>
      </div>
    </body>
    </html>
  `;
};

export default LoginEmailTemplate;
