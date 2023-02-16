
#ifdef RCT_NEW_ARCH_ENABLED
#import "RNZimkitRnSpec.h"

@interface ZimkitRn : NSObject <NativeZimkitRnSpec>
#else
#import <React/RCTBridgeModule.h>

@interface ZimkitRn : NSObject <RCTBridgeModule>
#endif

@end
