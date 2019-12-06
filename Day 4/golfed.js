b=n=>{s=[...n];d=0;for(i=1;i<6;i++){if(s[i]<s[i-1])return;if(s[i]==s[i-1])d=1};return d};v=0;for(j=178416;j<676461;j++)if(b(j+""))v++;console.log(v)

b=n=>{s=[...n];d=0;for(i=1;i<6;i++){if(s[i]<s[i-1])return;if(s[i]==s[i-1]&&s[i]!=s[i-2]&&s[i]!=s[i+1])d=1};return d};v=0;for(j=178416;j<676461;j++)if(b(j+""))v++;console.log(v)